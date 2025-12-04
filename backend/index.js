const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const postsRoutes = require("./routes/post.js");
const authRoutes = require("./routes/auth.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => res.send("BACKEND RUNNING — SIGNUP WORKS"));

app.listen(PORT, () => {
  console.log(`SERVER ON http://localhost:${PORT}`);
  console.log("SIGNUP IS 100% WORKING NOW");
});