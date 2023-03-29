import { User } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import { UserInterface } from "./api.types";
import bcrypt from "bcrypt";
import { generateSalts } from "../utils";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
// User fields:
// username: string
// password: string
// email: string
// firstName: string
// lastName: string
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
router.get(
  "/user/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const userInfo = req.body;
  try {
    const userWithSameUsername = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        username: req.body.email,
      },
    });
    if (userWithSameUsername) {
      res.status(404).send("Username unavailable.");
    }
    if (userWithSameEmail) {
      res.status(404).send("Email is already in use.");
    }
    const salt: number = await generateSalts();
    userInfo.password = bcrypt.hashSync(userInfo.password, salt);
    const newUser: User = await prisma.user.create({
      data: {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      },
    });
    console.log(newUser);
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});
export default router;
