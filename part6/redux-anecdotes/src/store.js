import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const anecdoteReducer = combineReducers({
  anecdotes: reducer,
  notifications: notificationReducer
});

const store =  createStore(anecdoteReducer, composeWithDevTools())

export default store;
