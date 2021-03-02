// Interface option
export interface Option {
  id: number;
  title: string;
  votes: number;
}

// Interface poll
export interface Poll {
  id: number;
  title: string;
}

// Interface poll view
export interface PollView {
  id: number;
  title: string;
  options: Option[];
}

// Interface new poll
export interface NewPoll {
  title: string;
  options: string[];
}

// Reducer state type
export type State = {
  polls: Poll[];
};

// Reducer action types
export type ActionTypes =
  | { type: "SET_POLLS"; payload: { polls: Poll[] } }
  | { type: "ADD_POLL"; payload: { poll: Poll } }
  | { type: "DELETE_POLL"; payload: { id: number } };
