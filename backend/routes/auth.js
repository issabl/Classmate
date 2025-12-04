const express = require("express");
const router = express.Router();

let users = [];

router.post("/signup", (req, res) => {
  const { fullName, email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email already registered!" });
  }

  users.push({ fullName, email, password });
  console.log("New user:", fullName, email);

  res.json({ message: "Account created successfully!" });
});

module.exports = router;