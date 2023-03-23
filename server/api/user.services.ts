import bcrypt from "bcrypt";
import prisma from "../../prisma/client";

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function createUserByEmailAndPassword(user: any) {
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

// module.exports = {
//   findUserByEmail,
//   findUserById,
//   createUserByEmailAndPassword,
// };

export default { findUserByEmail, findUserById, createUserByEmailAndPassword };
