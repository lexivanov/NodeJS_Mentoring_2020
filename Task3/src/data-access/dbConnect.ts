import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";

import { IUser } from "../types";
import { User } from "../models";

export const backup: Omit<IUser, "id" | "isDeleted">[] = [
  {
    login: "User1",
    password: "11111",
    age: 15
  },
  {
    login: "User2",
    password: "11111",
    age: 15
  },
  {
    login: "User3",
    password: "11111",
    age: 15
  },
  {
    login: "User4",
    password: "11111",
    age: 15
  },
  {
    login: "User5",
    password: "11111",
    age: 15
  },
];

export const dbConnect = async (env: NodeJS.ProcessEnv) => {
  new Sequelize(
    {
      host: env.DB_HOST,
      port: +env.DB_PORT,
      dialect: env.DB_DIALECT as Dialect,
      username: env.DB_USERNAME,
      database: env.DB_NAME,
      password: env.DB_PASSWORD,
      models: [User]
    }
  )
    .sync()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
}