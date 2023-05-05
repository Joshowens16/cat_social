import { User } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import { UserInterface } from "./api.types";
import bcrypt from "bcrypt";
import { autoFollow, generateSalts } from "../utils";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config();
const router = express.Router();
// route to get users feed
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  // find all the ID's of the users the user follows
  const following = await prisma.following.findMany({
    where: {
      userId: id,
    },
  });
  res.send(following);
});

export default router;
