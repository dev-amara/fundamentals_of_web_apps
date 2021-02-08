import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const anecdoteReducer = combineReducers({
  anecdotes: reducer,
  notifications: notificationReducer,
  filter: filterReducer
});

const store =  createStore(anecdoteReducer, composeWithDevTools())

export default store;
