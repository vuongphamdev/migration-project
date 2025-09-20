import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/postController";

import rateLimit from "express-rate-limit";

const putPostLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    message: "Too many requests, please try again later.",
    error: "Rate limit exceeded",
  },
});

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.put("/:id", putPostLimiter, updatePost);
postRouter.post("/", createPost);
postRouter.delete("/:id", deletePost);

export default postRouter;
