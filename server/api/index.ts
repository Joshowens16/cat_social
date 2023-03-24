import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
const router = express.Router();
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
