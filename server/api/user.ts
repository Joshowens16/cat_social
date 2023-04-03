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
// ROUTE TO FOLLOW ANOTHER USER
router.post(
  "/follow",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("in route");
    const { followeeUsername } = req.body;
    const { followeeId } = req.body;
    const { userId } = req.body;
    if (!userId || !followeeId || !followeeUsername)
      throw new Error("Missing required field");
    try {
      const [increaseFollowing, increaseFollowers] = await prisma.$transaction([
        prisma.user.findUnique({
          where: {
            id: userId,
          },
        }),
        prisma.user.findUnique({
          where: {
            id: followeeId,
          },
        }),
      ]);
      await prisma.$transaction([
        prisma.following.create({
          data: {
            followeeUsername: followeeUsername,
            followeeId: followeeId,
            userId: userId,
          },
        }),
        prisma.followers.create({
          data: {
            followerUsername: increaseFollowing!.username,
            followerId: increaseFollowing!.id,
            userId: increaseFollowers!.id,
          },
        }),
      ]);
      await prisma.$transaction([
        prisma.user.update({
          where: {
            username: increaseFollowing!.username,
          },
          data: {
            followingNumber: (increaseFollowing!.followingNumber += 1),
          },
        }),
        prisma.user.update({
          where: {
            username: increaseFollowers!.username,
          },
          data: {
            followersNumber: (increaseFollowers!.followersNumber += 1),
          },
        }),
      ]);
      res.status(200).send("success!");
    } catch (error) {
      next(error);
    }
  }
);
// ROUTE TO UNFOLLOW ANOTHER USER
router.post(
  "/unfollow",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("in route");
    const { followeeUsername } = req.body;
    const { followeeId } = req.body;
    const { userId } = req.body;
    if (!userId || !followeeId || !followeeUsername)
      throw new Error("Missing required field");
    try {
      const [decreaseFollowing, decreaseFollowers] = await prisma.$transaction([
        prisma.user.findUnique({
          where: {
            id: userId,
          },
        }),
        prisma.user.findUnique({
          where: {
            id: followeeId,
          },
        }),
      ]);
      if (!decreaseFollowers || !decreaseFollowing)
        throw new Error("Not found");
      console.log(userId, decreaseFollowing.id);
      const [removeFollower, removeFollowee] = await prisma.$transaction([
        prisma.followers.findFirst({
          where: {
            followerId: userId,
            userId: decreaseFollowers.id,
          },
        }),
        prisma.following.findFirst({
          where: {
            followeeId: decreaseFollowers.id,
            userId: userId,
          },
        }),
      ]);
      if (!removeFollower || !removeFollowee)
        throw new Error("User(s) not found!");
      prisma.$transaction([
        prisma.followers.delete({
          where: {
            id: removeFollower.id,
          },
        }),
        prisma.following.delete({
          where: {
            id: removeFollowee.id,
          },
        }),
      ]);
      await prisma.$transaction([
        prisma.user.update({
          where: {
            username: decreaseFollowing!.username,
          },
          data: {
            followingNumber: (decreaseFollowing!.followingNumber -= 1),
          },
        }),
        prisma.user.update({
          where: {
            username: decreaseFollowers!.username,
          },
          data: {
            followersNumber: (decreaseFollowers!.followersNumber -= 1),
          },
        }),
      ]);
      res.send("unfollowed!");
    } catch (error) {
      next(error);
    }
  }
);
export default router;
