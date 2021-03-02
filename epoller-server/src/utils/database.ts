import "reflect-metadata";
import { createConnection } from "typeorm";
import path from "path";

let synchronizeOption: boolean = false;

// Check NODE_ENV
if (process.env.NODE_ENV === "development") {
  synchronizeOption = true;
}

// Get entities path
let entitiesPath: string = "";
if (require.main) {
  entitiesPath = path.dirname(require.main.filename) + "\\entity\\*.js";
}

console.log("entitiesPath", entitiesPath);

// Database connection
export const connect = createConnection({
  type: "sqlite",
  database: "database.sqlite",
  entities: [entitiesPath],
  synchronize: synchronizeOption,
  logging: ["schema", "error", "warn", "log"],
});
