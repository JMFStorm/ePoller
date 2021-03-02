"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const config_1 = require("./utils/config");
const errorHandler_1 = require("./error/errorHandler");
const polls_1 = __importDefault(require("./routes/polls"));
const database_1 = require("./utils/database");
database_1.connect
    .then((connection) => {
    console.log("Database connected");
})
    .catch((error) => {
    console.log("Database connection error", error);
});
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
const build = path_1.default.join(__dirname, "build");
app.use(express_1.default.static(build));
app.use("/api/polls", polls_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(config_1.serverPort, () => {
    console.log(`ePoller started on port:${config_1.serverPort}`);
});
//# sourceMappingURL=server.js.map