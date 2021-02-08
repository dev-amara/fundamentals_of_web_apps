import anecdoteService from "../services/anecdotes";
import { notificationChange } from "./notificationReducer";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    case "UPDATE_ANECDOTE":
      const id = action.data.id;
      return state.map((a) => (a.id === id ? action.data : a));
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToChange = getState().anecdotes.find((a) => a.id === id);
    const votedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    const updatedAnecdote = await anecdoteService.update(id, votedAnecdote);
    dispatch({ type: "UPDATE_ANECDOTE", data: updatedAnecdote });

    dispatch(
      notificationChange(`You updated for : ${updatedAnecdote.content}`)
    );
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export default reducer;
