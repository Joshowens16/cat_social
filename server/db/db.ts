import { Sequelize } from "sequelize";

const config = {
  logging: false,
};
const DB_NAME = "cat_social";
const DB_URL = `postgresql://josh:passw@localhost:5432/${DB_NAME}?schema=public`;

const database = new Sequelize(DB_URL, config);

export default database;
