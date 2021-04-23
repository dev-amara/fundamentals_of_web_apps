import usersService from '../services/users'

export const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const initUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({ type: 'INIT_USERS', data: users })
  }
}

export default userReducer
