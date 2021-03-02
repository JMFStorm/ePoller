import Poll from "../entity/Poll";
import Option from "../entity/Option";

// Poll service
export default class PollService {
  constructor() {}

  async addNewPoll(
    pollTitle: string,
    pollOptions: string[]
  ): Promise<Poll | void> {
    try {
      let newPoll = Poll.create({ title: pollTitle });
      const pollResponse = await newPoll.save();

      for (let i = 0; i < pollOptions.length; i++) {
        let newOption = Option.create({
          title: pollOptions[i],
          votes: 0,
          poll: newPoll,
        });
        console.log(newOption, i);
        await newOption.save();
      }
      return pollResponse;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  async getPollById(pollId: number): Promise<Poll | void> {
    const poll = await Poll.findOne({ pollId }, { relations: ["options"] });

    if (!poll) {
      return;
    }
    return poll;
  }

  async getPolls(): Promise<Poll[] | void> {
    const polls = await Poll.find();

    if (!polls) {
      return;
    }
    return polls;
  }

  async deletePoll(poll: Poll): Promise<Poll> {
    const result: Poll = await Poll.remove(poll);
    return result;
  }
}
