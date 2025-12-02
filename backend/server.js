// server.js
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

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

// ---------------- SIGNUP ----------------
app.post("/api/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if email already exists
    const [existing] = await db.promise().query(
      "SELECT user_id FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
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

// ---------------- LOGIN ----------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [users] = await db
      .promise()
      .query(
        "SELECT user_id, full_name, email, password_hash FROM users WHERE email = ? AND is_active = 1",
        [email.trim().toLowerCase()]
      );

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful!",
      user: {
        id: user.user_id,
        fullName: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- GET USERS ----------------
app.get("/api/users", async (req, res) => {
  try {
    const [users] = await db
      .promise()
      .query(
        "SELECT user_id, full_name, email FROM users WHERE is_active = 1 ORDER BY full_name"
      );
    res.json(users);
  } catch (err) {
    console.error("USERS FETCH ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- TASK CREATION (TEMP) ----------------
app.post("/api/tasks", async (req, res) => {
  const { title, description, startDate, startTime, endDate, endTime, priority, memberEmails } =
    req.body;

  const creatorId = 1; // FIXED until auth implemented

  try {
    const startDatetime = `${startDate} ${startTime}:00`;
    const endDatetime = `${endDate} ${endTime}:00`;

    const [taskResult] = await db
      .promise()
      .query(
        "INSERT INTO tasks (title, description, start_datetime, end_datetime, priority, created_by) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description || null, startDatetime, endDatetime, priority, creatorId]
      );

    const taskId = taskResult.insertId;

    // Add creator as lead
    await db
      .promise()
      .query(
        "INSERT IGNORE INTO team_members (team_id, user_id, role_in_team) VALUES (?, ?, 'lead')",
        [taskId, creatorId]
      );

    // Add other members
    if (memberEmails && Array.isArray(memberEmails)) {
      for (const email of memberEmails) {
        const [user] = await db
          .promise()
          .query("SELECT user_id FROM users WHERE email = ? AND is_active = 1", [
            email.trim().toLowerCase(),
          ]);
        if (user.length > 0) {
          await db
            .promise()
            .query(
              "INSERT IGNORE INTO team_members (team_id, user_id, role_in_team) VALUES (?, ?, 'member')",
              [taskId, user[0].user_id]
            );
        }
      }
    }

    res.json({ message: "Task created successfully!", taskId });
  } catch (err) {
    console.error("TASK CREATE ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

// ---------------- START SERVER ----------------
app.listen(3000, () => console.log("Backend running at http://localhost:3000"));
