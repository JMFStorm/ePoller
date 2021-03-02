import axios, { AxiosResponse } from "axios";
import { NewPoll, Poll, PollView } from "../models/interfaces";

import { baseUrl } from "../utils/config";

// Get all polls
export const getAllPolls: () => Promise<Poll[]> = async () => {
  const response: AxiosResponse<Poll[]> = await axios.get<Poll[]>(
    `${baseUrl}api/polls`
  );
  return response.data;
};

// Get poll by id
export const getPoll: (pollsId: number) => Promise<PollView> = async (
  pollsId: number
) => {
  const response: AxiosResponse<PollView> = await axios.get<PollView>(
    `${baseUrl}api/polls/${pollsId}`
  );
  return response.data;
};

// Add new poll
export const AddPoll: (poll: NewPoll) => Promise<PollView> = async (
  poll: NewPoll
) => {
  const response: AxiosResponse<PollView> = await axios.post<PollView>(
    `${baseUrl}api/polls/`,
    poll
  );
  return response.data;
};

// Vote for poll option
export const VoteForOption: (
  optionId: number,
  pollsId: number
) => Promise<PollView> = async (optionId: number, pollsId: number) => {
  const response: AxiosResponse<PollView> = await axios.post<PollView>(
    `${baseUrl}api/polls/${pollsId}/vote/${optionId}`
  );
  return response.data;
};

// Delete poll
export const DeletePoll: (pollsId: number) => Promise<boolean> = async (
  pollsId: number
) => {
  const response: AxiosResponse<boolean> = await axios.delete<boolean>(
    `${baseUrl}api/polls/${pollsId}`
  );
  return response.data;
};
