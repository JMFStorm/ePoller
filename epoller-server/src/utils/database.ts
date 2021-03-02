import "reflect-metadata";
import { createConnection } from "typeorm";
import path from "path";

import {
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
  dbName,
  dbUrl,
} from "../utils/config";

let synchronizeOption: boolean = false;

// Check NODE_ENV
if (process.env.NODE_ENV === "development") {
  synchronizeOption = true;
}

// Get entities path
let entitiesPath: string = "";
if (require.main) {
  entitiesPath = path.dirname(require.main.filename) + "\\models\\*.js";
}

// Database connection
export const connect = createConnection({
  type: "postgres",
  host: dbHost,
  port: Number(dbPort),
  url: dbUrl,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  entities: [entitiesPath],
  synchronize: synchronizeOption,
  logging: ["error", "warn", "info"],
  ssl: {
    rejectUnauthorized: false,
  },
});
