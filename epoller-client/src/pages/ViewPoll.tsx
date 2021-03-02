import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { PollView } from "../models/interfaces";
import { getPoll, VoteForOption } from "../services/api";

// Params from url
interface ParamTypes {
  pollsId: string;
}

const ViewPoll: FC = () => {
  // Get poll id
  const { pollsId } = useParams<ParamTypes>();

  // Submit loading state
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // UseEffect on init
  useEffect(() => {
    fetchPoll();
  }, []);

  // CURRENT POLL
  // Current poll state
  const [poll, setPoll] = useState<PollView | null>(null);

  // Get current poll
  const fetchPoll = async () => {
    const poll: PollView = await getPoll(Number(pollsId));
    setPoll(poll);
  };

  // OPTION SELECT
  // Selected option state
  const [optionId, setOptionId] = useState<number | null>(null);

  // User has voted state
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false);

  // Vote for option
  const handleVote: () => Promise<void> = async () => {
    // Check if nulls
    if (!poll || !optionId) {
      return;
    }
    // Post vote
    const pollsId: number = poll.pollId;
    setSubmitLoading(true);
    const response: PollView = await VoteForOption(optionId, pollsId);

    // Set voted state
    setSubmitLoading(false);
    setPoll(response);
    setUserHasVoted(true);
  };

  // Return JSX
  return (
    <div className="page-wrapper page-wrapper--view-poll">
      {/* Poll view */}
      {poll && (
        <div className="vote-container">
          <h2 className="title h2">{poll.title}</h2>

          {/* List poll options */}
          <ul className="option-list">
            {poll.options.map((option, index) => (
              <li className="option-list__item" key={option.optionId}>
                {!userHasVoted && (
                  <input
                    className="input"
                    onClick={(e) => setOptionId(option.optionId)}
                    type="radio"
                    name="option"
                    value={option.optionId}
                  ></input>
                )}
                <label className="label">
                  <span className="label__index">#{index + 1}:</span>
                  {option.title}
                </label>
                <span className="span">{option.votes} votes</span>
              </li>
            ))}
          </ul>

          {/* Vote button */}
          {!userHasVoted && optionId && (
            <button
              className="vote-button"
              disabled={submitLoading || !optionId}
              onClick={handleVote}
            >
              {submitLoading ? "VOTING..." : "VOTE"}
            </button>
          )}
          {userHasVoted && (
            <div className="info">
              <p className="info__message">Thank you for voting!</p>
              <p className="info__link">
                <Link to="/">Click here to return.</Link>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewPoll;
