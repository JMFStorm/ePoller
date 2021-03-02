"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const polls_1 = require("../controllers/polls");
const pollsRouter = express_1.Router();
pollsRouter.get("/", polls_1.getPolls);
pollsRouter.get("/:pollId", polls_1.getPoll);
pollsRouter.post("/", polls_1.addPoll);
pollsRouter.post("/:pollId/vote/:optionId", polls_1.votePoll);
pollsRouter.delete("/:pollId", polls_1.deletePoll);
exports.default = pollsRouter;
//# sourceMappingURL=polls.js.map