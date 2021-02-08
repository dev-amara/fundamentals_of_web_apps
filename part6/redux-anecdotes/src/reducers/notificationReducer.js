export const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    return action.notification;
  default:
    return state;
  }
};

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const setNotification = (message, timeout) => {
  return async(dispatch) => {
    dispatch(notificationChange(message));

    setTimeout(() => {
      dispatch(notificationChange(null))
    }, timeout)
  };
};

export default notificationReducer;
