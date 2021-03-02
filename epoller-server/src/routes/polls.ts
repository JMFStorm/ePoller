import { Router } from "express";

import {
  addPoll,
  getPoll,
  getPolls,
  deletePoll,
  votePoll,
} from "../controllers/polls";

const pollsRouter = Router();

// Get polls
pollsRouter.get("/", getPolls);

// Get a poll
pollsRouter.get("/:pollId", getPoll);

// Add poll
pollsRouter.post("/", addPoll);

// Add poll
pollsRouter.post("/:pollId/vote/:optionId", votePoll);

// Delete poll
pollsRouter.delete("/:pollId", deletePoll);

export default pollsRouter;
