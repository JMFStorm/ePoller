import express from "express";
import cors from "cors";
import path from "path";

import { serverPort } from "./utils/config";
import { errorHandler } from "./error/errorHandler";
import pollsRouter from "./routes/polls";
import { connect } from "./utils/database";

connect
  .then(async () => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connection error", error);
  });

// Use Express
const app = express();

// Use cors
app.use(cors());

// Use JSON parser
app.use(express.json());

// Use static frontend files
const build = path.join(__dirname, "build");
app.use(express.static(build));

// Use routes
app.use("/api/polls", pollsRouter);

// Use error handler endpoint
app.use(errorHandler);

// Listen server
app.listen(serverPort, () => {
  console.log(`ePoller started on port:${serverPort}`);
});
