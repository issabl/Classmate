// backend/server.js
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
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