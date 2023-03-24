import bcrypt from "bcrypt";
import prisma from "../../../prisma/client";
import { UserInterface } from "../../utils/model.interfaces";
export function findUserByUsername(username: any) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

export function createUserByEmailAndPassword(user: UserInterface) {
  user.password = bcrypt.hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
}

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}
