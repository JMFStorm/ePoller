"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../error/HttpError"));
const poll_1 = __importDefault(require("../services/poll"));
const pollService = new poll_1.default();
exports.getPolls = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield pollService.getPolls();
        if (!response) {
            return next(new HttpError_1.default(500, `Get polls failed`));
        }
        return res.json({ polls: response });
    }
    catch (err) {
        return next(new HttpError_1.default(500, `Error: ${err.message}`));
    }
});
exports.getPoll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const pollId = Number(req.params.pollId);
        const response = yield pollService.getPollById(pollId);
        if (!response) {
            return next(new HttpError_1.default(500, `Couldn't find poll`));
        }
        return res.json(response);
    }
    catch (err) {
        return next(new HttpError_1.default(500, `Error: ${err.message}`));
    }
});
exports.addPoll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const pollTitle = req.body.title;
        const options = req.body.options;
        const response = yield pollService.addNewPoll(pollTitle, options);
        if (!response) {
            return next(new HttpError_1.default(500, `Add poll failed`));
        }
        const newPoll = yield pollService.getPollById(response.pollId);
        return res.send(newPoll);
    }
    catch (err) {
        return next(new HttpError_1.default(500, `Error: ${err.message}`));
    }
});
exports.votePoll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log("vote poll");
        return res.json("Vote");
    }
    catch (err) {
        return next(new HttpError_1.default(500, `Error: ${err.message}`));
    }
});
exports.deletePoll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const pollId = Number(req.params.pollId);
        const poll = yield pollService.getPollById(pollId);
        if (!poll) {
            return res.send("Already deleted");
        }
        const result = yield pollService.deletePoll(poll);
        return res.json({ deleted: result });
    }
    catch (err) {
        return next(new HttpError_1.default(500, `Error: ${err.message}`));
    }
});
//# sourceMappingURL=polls.js.map