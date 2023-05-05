import prisma from "./client";

async function main() {
  const alice = await prisma.user.create({
    data: {
      username: "alice100000",
      password: "100",
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
      password: "123",
    },
  });
  const josh = await prisma.user.create({
    data: {
      email: "josh@email.com",
      firstName: "Josh",
      lastName: "Owens",
      username: "jowens3",
      password: "123",
    },
  });
  const kamryn = await prisma.user.create({
    data: {
      email: "kamryn@email.com",
      firstName: "kamryn",
      lastName: "coleman",
      username: "kcoleman",
      password: "123",
    },
  });
  const rue = await prisma.user.create({
    data: {
      email: "rue@email.com",
      firstName: "Rue",
      lastName: "Appa",
      username: "RACO",
      password: "123",
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
