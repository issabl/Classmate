// backend/routes/post.js   ← FIXED VERSION
const express = require("express");
const router = express.Router();

// Temporary fake posts (or whatever you had before)
let posts = [];

// Example route — you can change later
router.get("/", (req, res) => {
  res.json(posts);
});

router.post("/", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});

module.exports = router;   // ← THIS MUST BE HERE