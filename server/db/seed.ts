import db from "./db";
import User from "./User";

const seed = async () => {
  console.log("BEGINNING SEED");
  await db.sync({ force: true });

  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: "moe", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);
  console.log("SEED COMPLETE");

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
  };
};

seed();
