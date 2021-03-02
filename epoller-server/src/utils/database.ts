import "reflect-metadata";
import { createConnection } from "typeorm";

import Option from "../models/Option";
import Poll from "../models/Poll";

import {
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
  dbName,
  dbUrl,
} from "../utils/config";

// Database connection
export const connect = createConnection({
  type: "postgres",
  host: dbHost,
  port: Number(dbPort),
  url: dbUrl,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  entities: [Option, Poll],
  synchronize: true,
  logging: ["error", "warn", "info"],
  ssl: {
    rejectUnauthorized: false,
  },
});
