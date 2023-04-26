import { User } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import { UserInterface } from "./api.types";
import bcrypt from "bcrypt";
import { generateSalts } from "../utils";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config();
const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const imageReference: string = req.body.imageReference;
  const description: string = req.body.description;
  const userID: string = req.body.userId;
  console.log(imageReference, description, userID);

  // Find user to associate the post with:
  const user = await prisma.user.findUnique({
    where: { id: userID },
  });
  if (!user) res.status(404).send("USER NOT FOUND");
  // CREATE POST
  try {
    await prisma.post.create({
      data: {
        imageRef: imageReference,
        authorId: user!.id,
      },
    });
  } catch (error) {
    res.sendStatus(404);
  }
  res.sendStatus(200);
});

// model Post {
//     id        Int        @id @default(autoincrement())
//     imageRef  String?
//     published Boolean    @default(true)
//     author    User?      @relation(fields: [authorId], references: [id])
//     authorId  String?
//     comments  Comments[]
//     likes     Likes[]
//   }
export default router;
