//server.js

const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");

// Import forgot password routes
const forgotPasswordRoutes = require("./changepass"); // make sure this file exports the router

const app = express();

// -----------------------------
// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// -----------------------------
// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "classmate_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("MySQL Connected Successfully!");
});

// -----------------------------
// Make DB available to routes (optional, but useful)
app.use((req, res, next) => {
  req.db = db;
  next();
});

// -----------------------------
// SIGNUP
app.post("/api/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const [existing] = await db.promise().query(
      "SELECT user_id FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    if (existing.length > 0)
      return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await db.promise().query(
      "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
      [fullName.trim(), email.trim().toLowerCase(), hashed]
    );

    res.json({ message: "Account created successfully!" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ error: "Server error — check backend console" });
  }
});

// -----------------------------
// LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const [users] = await db.promise().query(
      "SELECT user_id, full_name, email, password_hash FROM users WHERE email = ? AND is_active = 1",
      [email.trim().toLowerCase()]
    );

    if (users.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({
      message: "Login successful!",
      user: { id: user.user_id, fullName: user.full_name, email: user.email },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// -----------------------------
// GET USERS
app.get("/api/users", async (req, res) => {
  try {
    const [users] = await db.promise().query(
      "SELECT user_id, full_name, email FROM users WHERE is_active = 1 ORDER BY full_name"
    );
    res.json(users);
  } catch (err) {
    console.error("USERS FETCH ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// -----------------------------
// TASK CREATION
app.post("/api/tasks/create", async (req, res) => {
  const { title, description, startDate, startTime, endDate, endTime, priority, inviteEmails, creatorId } = req.body;  // Add creatorId from frontend

  if (!title || !priority) {
    return res.status(400).json({ error: "Title and priority required" });
  }

  // Validate dates/times exist
  if (!startDate || !endDate || !startTime || !endTime) {
    return res.status(400).json({ error: "Start/end dates and times required" });
  }

  // Validate creatorId exists in users (prevents FK error)
  if (creatorId) {
    const [userCheck] = await db.promise().query("SELECT user_id FROM users WHERE user_id = ? AND is_active = 1", [creatorId]);
    if (userCheck.length === 0) {
      return res.status(400).json({ error: "Invalid creator ID" });
    }
  } else {
    return res.status(400).json({ error: "Creator ID required" });
  }

  try {
    // UPDATED: Parse ISO date + 24hr time to DATETIME (YYYY-MM-DD HH:MM:SS)
    const parseDateTime = (dateStr, timeStr) => {
      // Ensure time has seconds if missing
      const fullTime = timeStr.includes(':') ? `${timeStr}:00` : `${timeStr.padStart(5, '0')}:00`;
      const datetimeStr = `${dateStr}T${fullTime}`;
      const date = new Date(datetimeStr);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid datetime: ${dateStr} ${timeStr}`);
      }
      return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    const startDatetime = parseDateTime(startDate, startTime);
    const endDatetime = parseDateTime(endDate, endTime);

    // Validate end > start
    if (new Date(endDatetime) <= new Date(startDatetime)) {
      return res.status(400).json({ error: "End datetime must be after start datetime" });
    }

    // Map priority if needed (e.g., frontend sends 'low'/'medium'/'high'; adjust to DB enum if different)
    const dbPriority = priority.toUpperCase(); // Or map: { low: 1, medium: 2, high: 3 } if numeric

    // Insert task
    const [taskResult] = await db.promise().query(
      "INSERT INTO tasks (title, description, start_datetime, end_datetime, priority, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description || null, startDatetime, endDatetime, dbPriority, creatorId]
    );
    const taskId = taskResult.insertId;

    // Add creator as 'lead'
    await db.promise().query(
      "INSERT IGNORE INTO team_members (team_id, user_id, role_in_team) VALUES (?, ?, 'lead')",
      [taskId, creatorId]
    );

    // Add invites (only registered)
    if (inviteEmails && Array.isArray(inviteEmails)) {
      for (const email of inviteEmails) {
        const [user] = await db.promise().query(
          "SELECT user_id FROM users WHERE email = ? AND is_active = 1",
          [email.trim().toLowerCase()]
        );
        if (user.length > 0) {
          await db.promise().query(
            "INSERT IGNORE INTO team_members (team_id, user_id, role_in_team) VALUES (?, ?, 'member')",
            [taskId, user[0].user_id]
          );
        }
      }
    }

    res.json({ message: "Task created successfully!", taskId });
  } catch (err) {
    console.error("TASK CREATE ERROR:", err);
    res.status(500).json({ error: "Server error — check console: " + err.message });
  }
});

// -----------------------------
// HEALTH CHECK
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

// -----------------------------
// FORGOT PASSWORD ROUTES
app.use("/api/auth", forgotPasswordRoutes); // changepass.js routes

// -----------------------------
// START SERVER
app.listen(3000, () => console.log("Backend running at http://localhost:3000"));