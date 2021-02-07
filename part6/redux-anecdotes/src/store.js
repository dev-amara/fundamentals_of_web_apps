import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'

const anecdoteReducer = combineReducers({
  anecdotes: reducer,
});

const store =  createStore(anecdoteReducer, composeWithDevTools())

export default store;
