import anecdoteService from '../services/anecdotes'

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
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (id, anecdotes) => {
  const anecdoteToChange = anecdotes.find((a) => a.id === id);
  return {
    type: "UPDATE_ANECDOTE",
    data: {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
      id: id,
    },
  };
};

export const createAnecdote = (data) => {
  return {
    type: "NEW_ANECDOTE",
    data,
  };
};

export default reducer;
