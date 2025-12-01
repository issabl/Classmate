// backend/server.js
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "classmate",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("MySQL Connected Successfully!");
});

// SIGNUP ROUTE — 100% WORKING
app.post("/api/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  console.log("Signup attempt:", { fullName, email }); // Debug log

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  try {
    // Check duplicate email
    const [existing] = await db.promise().query(
      "SELECT user_id FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.promise().query(
      "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
      [fullName.trim(), email.trim().toLowerCase(), hashedPassword]
    );

    console.log("User created successfully:", email);
    res.json({ message: "Account created successfully!" });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ error: "Server error — check console" });
  }
});

// Health check
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\nBackend running at http://localhost:${PORT}\n`);
});
// LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", { email }); // Debug log

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    // Find active user
    const [users] = await db.promise().query(
      "SELECT user_id, full_name, email, password_hash FROM users WHERE email = ? AND is_active = 1",
      [email.trim().toLowerCase()]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Login successful:", user.email);
    res.json({ 
      message: "Login successful!",
      user: { id: user.user_id, fullName: user.full_name, email: user.email }
      // TODO: Add JWT token here if using auth: const token = jwt.sign({ userId: user.user_id }, 'your-secret-key');
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error — check console" });
  }
});
// GET ACTIVE USERS FOR DROPDOWN (add before tasks route)
app.get("/api/users", async (req, res) => {
  try {
    const [users] = await db.promise().query(
      "SELECT user_id, full_name, email FROM users WHERE is_active = 1 ORDER BY full_name"
    );
    res.json(users); // Returns array [{user_id: 1, full_name: 'Jo Marie', email: '...'}]
  } catch (err) {
    console.error("USERS FETCH ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// TASK CREATION ROUTE (add after login route)
app.post("/api/tasks", async (req, res) => {
  const { title, description, startDate, startTime, endDate, endTime, priority, memberEmails } = req.body; // memberEmails = array of emails from form select
  const creatorId = req.user.id; // From JWT/login (assume authenticated)

  try {
    // Combine date/time to DATETIME (e.g., '2025-12-01 08:00:00')
    const startDatetime = `${startDate} ${startTime}:00`;
    const endDatetime = `${endDate} ${endTime}:00`;

    // Insert task
    const [taskResult] = await db.promise().query(
      "INSERT INTO tasks (title, description, start_datetime, end_datetime, priority, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description || null, startDatetime, endDatetime, priority, creatorId]
    );
    const taskId = taskResult.insertId;

    // Add creator as 'lead' in team_members
    await db.promise().query(
      "INSERT IGNORE INTO team_members (team_id, user_id, role_in_team) VALUES (?, ?, 'lead')",
      [taskId, creatorId]
    );

    // Add selected members (lookup by email, default 'member')
    if (memberEmails && Array.isArray(memberEmails)) {
      for (const email of memberEmails) {
        const [user] = await db.promise().query(
          "SELECT user_id FROM users WHERE email = ? AND is_active = 1",
          [email.trim().toLowerCase()]
        );
        if (user.length > 0) {
          await db.promise().query(
            "INSERT IGNORE INTO team_members (team_id, user_id, role_in_team) VALUES (?, ?, 'member')",
            [taskId, user[0].user_id]
          );
        } else {
          console.warn(`User not found for email: ${email}`);
        }
      }
    }

    console.log(`Task ${taskId} created with members`);
    res.json({ message: "Task created successfully!", taskId });
  } catch (err) {
    console.error("TASK CREATE ERROR:", err);
    res.status(500).json({ error: "Server error — check console" });
  }
});