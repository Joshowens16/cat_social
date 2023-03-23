import express from "express";
import userRouter from "./user";
const router = express.Router();
import auth from "./auth.routes";

router.use("/users", userRouter);
router.use("/auth", auth);
export default router;
