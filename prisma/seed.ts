import prisma from "./client";
import { generateSalts } from "../server/utils";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
async function main() {
  const salt: number = await generateSalts();
  const alice = await prisma.user.create({
    data: {
      username: "alice100000",
      password: bcrypt.hashSync("100", salt),
      email: "alice@prisma.com",
      firstName: "Alice",
      lastName: "Jones",
    },
  });
  const bob = await prisma.user.create({
    data: {
      email: "bob@prisma.io",
      firstName: "Bob",
      lastName: "Coleman",
      username: "bobbyc102",
      password: bcrypt.hashSync("100", salt),
    },
  });
  const josh = await prisma.user.create({
    data: {
      email: "josh@email.com",
      firstName: "Josh",
      lastName: "Owens",
      username: "jowens3",
      password: bcrypt.hashSync("100", salt),
    },
  });
  const kamryn = await prisma.user.create({
    data: {
      email: "kamryn@email.com",
      firstName: "kamryn",
      lastName: "coleman",
      username: "kcoleman",
      password: bcrypt.hashSync("100", salt),
    },
  });
  const rue = await prisma.user.create({
    data: {
      email: "rue@email.com",
      firstName: "Rue",
      lastName: "Appa",
      username: "RACO",
      password: bcrypt.hashSync("100", salt),
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
