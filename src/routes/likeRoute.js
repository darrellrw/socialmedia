import express from "express";

import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";
import { getLikes, getLikeByID, getLikesByPost, getLikesByUser, createLike, deleteLikeByID } from "../controllers/likeController.js";

const likeRouter = express.Router();

likeRouter.get("/likes", verifyToken, getLikes);
likeRouter.get("/like/:id", verifyToken, getLikeByID);
likeRouter.get("/likes/post/:id_post", verifyToken, getLikesByPost);
likeRouter.get("/likes/user/:uuid", verifyToken, getLikesByUser);
likeRouter.post("/like", verifyToken, createLike);
likeRouter.delete("/like/:id", verifyToken, deleteLikeByID);

export default likeRouter;