import prisma from "../prisma/client";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
interface ResponseError extends Error {
  status?: number;
}
const JWT = process.env.ACCESS_TOKEN_SECRET;

export async function authenticate(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  console.log("we will hit here");
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT as Secret);
  }
}

export async function findByToken(token: string) {
  try {
    const { id } = jwt.verify(token, JWT as Secret) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        profilePhotoRef: true,
        followersNumber: true,
        followingNumber: true,
      },
    });
    if (user) {
      return user;
    }
    if (!user) throw new Error("User not found");
  } catch (err) {
    const error = new Error("Bad Credentials") as ResponseError;
    error.status = 401;
    throw error;
  }
}

export async function generateToken(id: string) {
  return jwt.sign({ id: id }, JWT as Secret);
}
export async function generateSalts() {
  return Math.floor(Math.random() * 4) + 12;
}

// Function to make new users follow default users
export async function autoFollow(user: any) {
  const rue = await prisma.user.findUnique({
      where: {
        username: "RACO",
      },
    }),
    kamryn = await prisma.user.findUnique({
      where: {
        username: "kcoleman",
      },
    }),
    josh = await prisma.user.findUnique({
      where: {
        username: "jowens3",
      },
    }),
    bob = await prisma.user.findUnique({
      where: {
        username: "bobbyc102",
      },
    }),
    alice = await prisma.user.findUnique({
      where: {
        username: "alice100000",
      },
    });
  await prisma.$transaction([
    prisma.following.create({
      data: {
        followeeUsername: rue!.username,
        followeeId: rue!.id,
        userId: user.id,
      },
    }),
    prisma.following.create({
      data: {
        followeeUsername: josh!.username,
        followeeId: josh!.id,
        userId: user!.id,
      },
    }),
    prisma.following.create({
      data: {
        followeeUsername: kamryn!.username,
        followeeId: kamryn!.id,
        userId: user!.id,
      },
    }),
    prisma.following.create({
      data: {
        followeeUsername: bob!.username,
        followeeId: bob!.id,
        userId: user!.id,
      },
    }),
    prisma.following.create({
      data: {
        followeeUsername: alice!.username,
        followeeId: alice!.id,
        userId: user!.id,
      },
    }),
    //
    prisma.followers.create({
      data: {
        followerUsername: user!.username,
        followerId: user!.id,
        userId: rue!.id,
      },
    }),
    prisma.followers.create({
      data: {
        followerUsername: user!.username,
        followerId: user!.id,
        userId: kamryn!.id,
      },
    }),
    prisma.followers.create({
      data: {
        followerUsername: user!.username,
        followerId: user!.id,
        userId: josh!.id,
      },
    }),
    prisma.followers.create({
      data: {
        followerUsername: user!.username,
        followerId: user!.id,
        userId: bob!.id,
      },
    }),
    prisma.followers.create({
      data: {
        followerUsername: user!.username,
        followerId: user!.id,
        userId: alice!.id,
      },
    }),
  ]);
  await prisma.$transaction([
    prisma.user.update({
      where: {
        username: user!.username,
      },
      data: {
        followingNumber: (user!.followingNumber += 5),
      },
    }),
    prisma.user.update({
      where: {
        username: rue!.username,
      },
      data: {
        followersNumber: (rue!.followersNumber += 1),
      },
    }),
    prisma.user.update({
      where: {
        username: bob!.username,
      },
      data: {
        followersNumber: (bob!.followersNumber += 1),
      },
    }),
    prisma.user.update({
      where: {
        username: kamryn!.username,
      },
      data: {
        followersNumber: (kamryn!.followersNumber += 1),
      },
    }),
    prisma.user.update({
      where: {
        username: alice!.username,
      },
      data: {
        followersNumber: (alice!.followersNumber += 1),
      },
    }),
    prisma.user.update({
      where: {
        username: josh!.username,
      },
      data: {
        followersNumber: (josh!.followersNumber += 1),
      },
    }),
  ]);
  console.log(rue, kamryn, josh, bob, alice, user);
}
