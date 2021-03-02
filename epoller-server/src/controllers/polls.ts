import { RequestHandler } from "express";

import HttpError from "../error/HttpError";
import PollService from "../services/poll";
import Poll from "../models/Poll";

const pollService = new PollService();

// Get polls
export const getPolls: RequestHandler = async (req, res, next) => {
  try {
    const response: Poll[] | void = await pollService.getPolls();
    if (!response) {
      return next(new HttpError(500, `Get polls failed`));
    }

    return res.json({ polls: response });
  } catch (err) {
    // Error
    return next(new HttpError(500, `Error: ${err.message}`));
  }
};

// Get poll
export const getPoll: RequestHandler = async (req, res, next) => {
  try {
    const pollId = Number(req.params.pollId);
    const response: Poll | void = await pollService.getPollById(pollId);
    if (!response) {
      return next(new HttpError(500, `Couldn't find poll`));
    }

    return res.json(response);
  } catch (err) {
    // Error
    return next(new HttpError(500, `Error: ${err.message}`));
  }
};

// Add poll
export const addPoll: RequestHandler = async (req, res, next) => {
  try {
    const pollTitle: string = req.body.title;
    const options: string[] = req.body.options;

    const response: Poll | void = await pollService.addNewPoll(
      pollTitle,
      options
    );
    if (!response) {
      return next(new HttpError(500, `Add poll failed`));
    }

    const newPoll = await pollService.getPollById(response.pollId);

    return res.send(newPoll);
  } catch (err) {
    // Error
    return next(new HttpError(500, `Error: ${err.message}`));
  }
};

// Vote poll
export const votePoll: RequestHandler = async (req, res, next) => {
  try {
    const optionId = Number(req.params.optionId);
    const pollId = Number(req.params.pollId);

    const newPoll = await pollService.voteForOption(optionId);
    if (!newPoll) {
      return next(new HttpError(500, `Vote failed`));
    }
    const updatedPoll = await pollService.getPollById(pollId);

    return res.send(updatedPoll);
  } catch (err) {
    // Error
    return next(new HttpError(500, `Error: ${err.message}`));
  }
};

// Delete poll
export const deletePoll: RequestHandler = async (req, res, next) => {
  try {
    const pollId = Number(req.params.pollId);

    const poll = await pollService.getPollById(pollId);
    if (!poll) {
      return res.send("Already deleted");
    }
    const result: Poll = await pollService.deletePoll(poll);

    return res.json({ deleted: result });
  } catch (err) {
    // Error
    return next(new HttpError(500, `Error: ${err.message}`));
  }
};
