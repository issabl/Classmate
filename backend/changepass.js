import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // frontend URL
app.use(bodyParser.json());

const PORT = 5000;

// OTP storage
const otpStore = {};  

// System email (replace with your Gmail + App Password)
const SYSTEM_EMAIL = "classmate.system1@gmail.com";
const SYSTEM_PASSWORD = "jfxugfmbkrghqool";

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: SYSTEM_EMAIL, pass: SYSTEM_PASSWORD },
});

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Request OTP
app.post("/api/auth/request-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = generateOTP();
  otpStore[email] = { otp, expiresAt: Date.now() + 5*60*1000 };

  const mailOptions = {
    from: SYSTEM_EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Failed to send OTP:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
