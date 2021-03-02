import { ActionTypes, Poll, State } from "../models/interfaces";

// Add new poll action
const AddPoll = (poll: Poll, state: State): State => {
  const newPolls = [poll, ...state.polls];
  return { polls: newPolls };
};

// Delete poll action
const DeletePoll = (id: number, state: State): State => {
  const newPolls = state.polls.filter((currentPoll) =>
    currentPoll.pollId === id ? false : true
  );
  return { polls: newPolls };
};

// Polls reducer
const pollsReducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "SET_POLLS":
      return { polls: action.payload.polls };
    case "ADD_POLL":
      return AddPoll(action.payload.poll, state);
    case "DELETE_POLL":
      return DeletePoll(action.payload.id, state);
    default:
      return state;
  }
};

export default pollsReducer;
