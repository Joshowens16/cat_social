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
  await prisma.followers.create({
    data: {
      followerUsername: bob.username,
      followerId: bob.id,
      userId: alice.id,
    },
  });
  await prisma.user.update({
    where: {
      id: alice.id,
    },
    data: {
      followersNumber: (alice.followersNumber += 1),
    },
  });
  await prisma.following.create({
    data: {
      followeeUsername: alice.username,
      followeeId: alice.id,
      userId: bob.id,
    },
  });
  await prisma.user.update({
    where: {
      id: bob.id,
    },
    data: {
      followingNumber: (bob.followersNumber += 1),
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
