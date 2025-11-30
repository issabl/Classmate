import express from "express";
import { getPosts } from "../controllers/post.js";

const router = express.Router();

// GET /api/posts
router.get("/", getPosts);

export default router;
