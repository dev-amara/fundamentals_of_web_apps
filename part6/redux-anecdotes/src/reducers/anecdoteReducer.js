import anecdotesService from "../services/anecdotes";
import { displayNotification } from "./notificationReducer";

export const initialState = [];

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data || state;
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "UPDATE_ANECDOTE":
      const id = action.data.id;
      return state.map((a) => (a.id === id ? action.data : a));
    default:
      return state;
  }
};

export const initAnecdotes = () => {
  return async (dispatch) => {
      const anecdotes = await anecdotesService.getAll();
      dispatch({ type: "INIT_ANECDOTES", data: anecdotes });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(content);
    dispatch({ type: "NEW_ANECDOTE", data: newAnecdote });
    const message = `You added "${newAnecdote.content}"`;
    dispatch(displayNotification(message, 5000));
  };
};

export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
      const anecdoteToChange = getState().anecdotes.find((a) => a.id === id);
      const votedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      const updatedAnecdote = await anecdotesService.update(id, votedAnecdote);
      dispatch({ type: "UPDATE_ANECDOTE", data: updatedAnecdote });
      const message = `You voted for "${updatedAnecdote.content}"`;
      dispatch(displayNotification(message, 2000));
  };
};

export default anecdoteReducer;
