import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import postRouter from "./posts";
import feedRouter from "./feed";
const router = express.Router();
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/feed", feedRouter);
export default router;
