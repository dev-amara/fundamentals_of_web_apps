import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer  from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const anecdoteReducer = combineReducers({
  anecdotes: reducer,
  notifications: notificationReducer,
  filter: filterReducer
});

const store =  createStore(anecdoteReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store;
