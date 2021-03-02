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
const Poll_1 = __importDefault(require("../models/Poll"));
const Option_1 = __importDefault(require("../models/Option"));
class PollService {
    constructor() { }
    addNewPoll(pollTitle, pollOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newPoll = Poll_1.default.create({ title: pollTitle });
                const pollResponse = yield newPoll.save();
                for (let i = 0; i < pollOptions.length; i++) {
                    let newOption = Option_1.default.create({
                        title: pollOptions[i],
                        votes: 0,
                        poll: newPoll,
                    });
                    console.log(newOption, i);
                    yield newOption.save();
                }
                return pollResponse;
            }
            catch (err) {
                console.error(err);
                return;
            }
        });
    }
    getPollById(pollId) {
        return __awaiter(this, void 0, void 0, function* () {
            const poll = yield Poll_1.default.findOne({ pollId }, { relations: ["options"] });
            if (!poll) {
                throw new Error("Invalid poll id");
            }
            return poll;
        });
    }
    getPolls() {
        return __awaiter(this, void 0, void 0, function* () {
            const polls = yield Poll_1.default.find();
            if (!polls) {
                return;
            }
            return polls;
        });
    }
    voteForOption(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let option = yield Option_1.default.findOne({ optionId: id });
            if (!option) {
                return;
            }
            option.votes += 1;
            const response = yield option.save();
            return response;
        });
    }
    deletePoll(poll) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Poll_1.default.remove(poll);
            return result;
        });
    }
}
exports.default = PollService;
//# sourceMappingURL=poll.js.map