import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/userRoute.js";
import commentRouter from "./routes/commentRoute.js";
import likeRouter from "./routes/likeRoute.js";
import postRouter from "./routes/postRoute.js";
import reportRouter from "./routes/reportRoute.js";

dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
    origin: true
}));

app.use(cookieParser());
app.use(express.json());

app.use(userRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(postRouter);
app.use(reportRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});