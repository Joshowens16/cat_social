// import prisma from "./client";

// async function main() {
//   const alice = await prisma.user.create({
//     data: {
//       username: "alice100000",
//       password: "100",
//       email: "alice@prisma.com",
//       firstName: "Alice",
//       lastName: "Jones",
//     },
//   });
//   // const bob = await prisma.user.upsert({
//   //   where: { email: "bob@prisma.io" },
//   //   update: {},
//   //   create: {
//   //     email: "bob@prisma.io",
//   //     firstName: "Bob",
//   //     lastName: "Coleman",
//   //     username: "bobbyc102",
//   //     password: "123",
//   //   },
//   // });
//   // console.log({ alice, bob });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
