const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

const router = express.Router();

// -----------------------------
// MySQL connection (reuse same DB config)
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
  console.log("MySQL Connected for Forgot Password!");
});

// -----------------------------
// OTP store (in-memory)
const otpStore = {};

// -----------------------------
// System email (Gmail + App Password)
const SYSTEM_EMAIL = "classmate.system1@gmail.com";
const SYSTEM_PASSWORD = "jfxugfmbkrghqool";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: SYSTEM_EMAIL, pass: SYSTEM_PASSWORD },
});

// -----------------------------
// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// -----------------------------
// Validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// -----------------------------
// Request OTP
router.post("/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!isValidEmail(email)) return res.status(400).json({ message: "Invalid email format" });

    // Check if email exists
    const [rows] = await db.promise().query(
      "SELECT user_id FROM users WHERE email = ? AND is_active = 1",
      [email.trim().toLowerCase()]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Email not found" });

    // Generate OTP and store it
    const otp = generateOTP();
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 minutes

    // Send OTP email
    await transporter.sendMail({
      from: SYSTEM_EMAIL,
      to: email,
      subject: "ClassMate: Your OTP Code",
      text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
    });

    console.log(`OTP sent to ${email}: ${otp}`);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Request OTP Error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// -----------------------------
// Verify OTP
router.post("/verify-otp", (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!otpStore[email]) return res.status(400).json({ message: "OTP not requested" });

    const { otp: storedOtp, expiresAt } = otpStore[email];
    if (Date.now() > expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }
    if (otp !== storedOtp) return res.status(400).json({ message: "Invalid OTP" });

    // Generate temporary token for password reset
    const token = Math.random().toString(36).substring(2, 12);
    otpStore[email].token = token;

    res.json({ token });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
});

// -----------------------------
// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: "Token and new password are required" });

    // Find email linked to token
    const entry = Object.entries(otpStore).find(([_, v]) => v.token === token);
    if (!entry) return res.status(400).json({ message: "Invalid or expired token" });

    const [email] = entry;

    // Hash password and update database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db
      .promise()
      .query("UPDATE users SET password_hash = ? WHERE email = ?", [hashedPassword, email]);

    // Remove OTP entry
    delete otpStore[email];

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
});

module.exports = router;
