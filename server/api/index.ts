import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import postRouter from "./posts";
const router = express.Router();
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postRouter);
export default router;
