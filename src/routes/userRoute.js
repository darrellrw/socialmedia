import express from "express";

import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";
import { getUsers, getUserByUUID, refreshToken, register, login, logout, updateUserDataByUUID, updateUserPasswordByUUID, deleteUserByUUID } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", verifyToken, verifyAdmin, getUsers);
userRouter.get("/user/:uuid", verifyToken, verifyAdmin, getUserByUUID);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", verifyToken, logout);
userRouter.post("/refreshToken", verifyToken, refreshToken);
userRouter.put("/user/:uuid", verifyToken, verifyAdmin, updateUserDataByUUID);
userRouter.put("/user/:uuid/password", verifyToken, verifyAdmin, updateUserPasswordByUUID);
userRouter.delete("/user/:uuid", verifyToken, verifyAdmin, deleteUserByUUID);

export default userRouter;