import React, { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../services/AppContext";
import { DeletePoll } from "../services/api";
import { Poll } from "../models/interfaces";

const ListPolls: FC = () => {
  // AppContext
  const { statePolls, dispatch } = useContext(AppContext);

  // DELETE POLL
  // Deletion state
  const [deleting, setDeleting] = useState<boolean>(false);

  // Delete poll
  const deletePollHandle: (pollsId: number, pollTitle: string) => void = async (
    pollsId: number,
    pollTitle: string
  ) => {
    if (!window.confirm(`Deleting "${pollTitle}". Confirm?`)) {
      return;
    }
    setDeleting(true);
    const response = await DeletePoll(pollsId);
    if (!response) {
      setDeleting(false);
      return;
    }
    // Dispatch deletion
    dispatch({
      type: "DELETE_POLL",
      payload: {
        id: pollsId,
      },
    });
    setDeleting(false);
  };

  // Return JSX
  return (
    <div className="page-wrapper page-wrapper--list-polls">
      <h2 className="title h2">VIEW POLLS</h2>

      {/* List polls */}
      {statePolls.polls && (
        <ul className="poll-list">
          {statePolls.polls.map((poll: Poll) => {
            return (
              <li className="poll-list__item" key={poll.id}>
                <Link to={`/list-polls/${poll.id}`}>{poll.title}</Link>
                <button
                  className="poll-list__button"
                  disabled={deleting}
                  onClick={(e) => deletePollHandle(poll.id, poll.title)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ListPolls;
