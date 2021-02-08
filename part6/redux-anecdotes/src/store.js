import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'

const anecdoteReducer = combineReducers({
  anecdotes: reducer,
  notifications: notificationReducer,
  filter: filterReducer
});

const store =  createStore(anecdoteReducer, composeWithDevTools())

anecdoteService.getAll().then(notes =>
  store.dispatch(initializeAnecdotes(notes))
)
export default store;
