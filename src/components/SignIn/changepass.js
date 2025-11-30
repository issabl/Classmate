import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

const PORT = 5000;

// ----------------- STORAGE -----------------
const otpStore = {};     // { email: { otp, expiresAt } }
const resetTokens = {};  // { token: email }

// ----------------- HELPER -----------------
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// ----------------- SYSTEM EMAIL -----------------
const SYSTEM_EMAIL = "marypgoy@gmail.com";      // <-- SYSTEM EMAIL (must be yours)
const SYSTEM_PASSWORD = "1120nov";      // <-- App password if 2FA enabled

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: SYSTEM_EMAIL, pass: SYSTEM_PASSWORD },
});

// ----------------- REQUEST OTP -----------------
app.post("/api/auth/request-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // Generate OTP automatically
  const otp = generateOTP();
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP valid 5 min

  // Email options
  const mailOptions = {
    from: SYSTEM_EMAIL,   // SYSTEM email sending
    to: email,            // Recipient email (user email)
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent automatically to ${email}: ${otp}`);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Failed to send OTP:", err);
    res.status(500).json({ message: "Failed to send OTP. Check system email credentials." });
  }
});

// ----------------- VERIFY OTP -----------------
app.post("/api/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

  const record = otpStore[email];
  if (!record) return res.status(400).json({ message: "No OTP requested for this email" });
  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp === otp) {
    const token = Math.random().toString(36).substring(2, 15);
    resetTokens[token] = email;
    delete otpStore[email];
    return res.json({ token });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});

// ----------------- RESET PASSWORD -----------------
app.post("/api/auth/reset-password", (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: "Token and new password required" });

  const email = resetTokens[token];
  if (!email) return res.status(400).json({ message: "Invalid token" });

  // Here you would update the password in your database
  console.log(`Password for ${email} updated to: ${newPassword}`);
  delete resetTokens[token];

  return res.json({ message: "Password updated successfully" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
