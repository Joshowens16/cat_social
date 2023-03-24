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
