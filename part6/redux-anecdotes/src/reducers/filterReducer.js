export const initialState = '';

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_FILTER":
    return action.filter;
  default:
    return state;
  }
};

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export default filterReducer;
