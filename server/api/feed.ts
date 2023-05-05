import { User } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import { UserInterface } from "./api.types";
import bcrypt from "bcrypt";
import { autoFollow, generateSalts } from "../utils";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
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
  const followingListId: string[] = [];
  following.map((user) => {
    followingListId.push(user.followeeId);
  });
  console.log(followingListId);
  const pageNumber = req.body.pageNumber || 1;
  const posts = await prisma.post.findMany({
    where: {
      authorId: {
        in: followingListId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    skip: (pageNumber - 1) * 10,
  });
  const imageRefs: any[] = [];
  posts.map((post) => {
    imageRefs.push(post.imageRef);
  });

  res.send(following);
});

export default router;
