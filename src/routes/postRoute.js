import express from "express";

import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";
import { getPosts, getPostByID, getPostsByUser, createPost, updatePostByID, deletePostByID } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/posts", verifyToken, getPosts);
postRouter.get("/post/:id", verifyToken, getPostByID);
postRouter.get("/posts/user/:uuid", verifyToken, getPostsByUser);
postRouter.post("/post", verifyToken, createPost);
postRouter.put("/post/:id", verifyToken, updatePostByID);
postRouter.delete("/post/:id", verifyToken, deletePostByID);

export default postRouter;