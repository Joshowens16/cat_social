import prisma from "../../prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { authenticate, findByToken } from "../utils";
const router = express.Router();
const User = prisma.user;

/**
 * Get user based on token
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Invalid authorization");
    }
    const user = await findByToken(req.headers.authorization);
    console.log("get" + user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

/**
 * Authenticate User
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      throw new Error("Invalid parameters");
    }
    const data = await authenticate(req.body.username, req.body.password);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

export default router;
