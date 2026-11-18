import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  validatePostId,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", validatePostId, getPost);
router.patch("/:id", validatePostId, updatePost);
router.delete("/:id", validatePostId, deletePost);

export default router;