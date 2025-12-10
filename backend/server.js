const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const forgotPasswordRoutes = require("./changepass");
const { getNotifications, markNotificationsRead } = require("./notif");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Create MySQL promise pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "classmate_db",
  waitForConnections: true,
  connectionLimit: 10,
});

// Attach DB to req
app.use((req, res, next) => {
  req.db = db;
  next();
});

// TEST CONNECTION
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("MySQL Connected Successfully!");
    conn.release();
  } catch (err) {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  }
})();

// --------------------------------- SIGNUP ---------------------------------
app.post("/api/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const [existing] = await db.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    if (existing.length > 0)
      return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
      [fullName.trim(), email.trim().toLowerCase(), hashed]
    );

    res.json({ message: "Account created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------------------- LOGIN ---------------------------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const [users] = await db.query(
      "SELECT user_id, full_name, email, password_hash FROM users WHERE email = ? AND is_active = 1",
      [email.trim().toLowerCase()]
    );

    if (users.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    res.json({
      message: "Login successful!",
      user: {
        id: user.user_id,
        fullName: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------------------- USERS LIST ---------------------------------
app.get("/api/users", async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT user_id, full_name, email FROM users WHERE is_active = 1 ORDER BY full_name"
    );
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- TASK CREATION ----------------
app.post("/api/tasks", async (req, res) => {
  const {
    title,
    description,
    startDate,
    startTime,
    endDate,
    endTime,
    priority,
    memberEmails = [],
  } = req.body;

  const creatorId = 1; // TODO: real auth later

  if (!title?.trim())
    return res.status(400).json({ error: "Task title is required." });

  if (!startDate || !startTime || !endDate || !endTime)
    return res
      .status(400)
      .json({ error: "Start and end date/time are required." });

  try {
    const startDatetime = `${startDate} ${startTime}:00`;
    const endDatetime = `${endDate} ${endTime}:00`;

    // INSERT TASK
    const [taskResult] = await db.query(
      `INSERT INTO tasks 
        (title, description, start_datetime, end_datetime, priority, created_by) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        description?.trim() || null,
        startDatetime,
        endDatetime,
        priority || "Normal",
        creatorId,
      ]
    );

    const taskId = taskResult.insertId;

    // ADD CREATOR
    await db.query(
      `INSERT IGNORE INTO team_members 
       (team_id, user_id, role_in_team, is_active, joined_at) 
       VALUES (?, ?, 'lead', 1, NOW())`,
      [taskId, creatorId]
    );

    // NO MEMBERS → DONE
    if (!Array.isArray(memberEmails) || memberEmails.length === 0) {
      return res.json({
        message: "Task created successfully!",
        taskId,
        totalMembers: 1,
      });
    }

    const uniqueEmails = [...new Set(
      memberEmails
        .map((e) => e?.trim().toLowerCase())
        .filter((e) => e && /^\S+@\S+\.\S+$/.test(e))
    )];

    const totalAfterAdd = 1 + uniqueEmails.length;

    if (totalAfterAdd > 40) {
      return res.status(400).json({
        error: `Tasks can have a max of 40 members. You attempted ${totalAfterAdd}.`,
      });
    }

    const placeholders = uniqueEmails.map(() => "?").join(",");
    const [validUsers] = await db.query(
      `SELECT user_id, email FROM users WHERE email IN (${placeholders}) AND is_active = 1`,
      uniqueEmails
    );

    if (validUsers.length === 0) {
      return res.json({
        message: "Task created successfully! No valid members found.",
        taskId,
        addedMembers: 0,
      });
    }

    const memberValues = validUsers.map((user) => [
      taskId,
      user.user_id,
      "member",
      1,
      new Date(),
    ]);

    await db.query(
      `INSERT IGNORE INTO team_members 
       (team_id, user_id, role_in_team, is_active, joined_at)
       VALUES ?`,
      [memberValues]
    );

    res.json({
      message: "Task created successfully!",
      taskId,
      addedMembers: validUsers.length,
      totalMembers: 1 + validUsers.length,
    });
  } catch (err) {
    console.error("TASK CREATE ERROR:", err);
    res.status(500).json({
      error: "Server error while creating task.",
      details: err.message,
    });
  }
});

// ---------------- NOTIFICATIONS ----------------
app.get("/api/notifications/:userId", async (req, res) => {
  const { userId } = req.params;
  const notifications = await getNotifications(userId);
  res.json(notifications);
});

app.post("/api/notifications/read/:userId", async (req, res) => {
  const { userId } = req.params;
  const result = await markNotificationsRead(userId);
  res.json(result);
});

// HEALTH CHECK
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

// FORGOT PASSWORD
app.use("/api/auth", forgotPasswordRoutes);

// START SERVER
app.listen(3000, () =>
  console.log("Backend running at http://localhost:3000")
);
