import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
} from "../controllers/posts.js";
import auth from "../middlware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.get("/:id", getPost);
router.patch("/:id/likePost", auth, likePost);
export default router;
