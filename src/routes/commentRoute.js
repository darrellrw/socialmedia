import express from "express";

import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";
import { getComments, getCommentByID, getCommentsByPost, getCommentsByUser, createComment, updateCommentByID } from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.get("/comments", verifyToken, getComments);
commentRouter.get("/comment/:id", verifyToken, getCommentByID);
commentRouter.get("/comments/post/:id_post", verifyToken, getCommentsByPost);
commentRouter.get("/comments/user/:uuid", verifyToken, getCommentsByUser);
commentRouter.post("/comment", verifyToken, createComment);
commentRouter.put("/comment/:id", verifyToken, updateCommentByID);

export default commentRouter;