import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import authReducer from "./reducers/authReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
    blogs: blogReducer,
    users: userReducer,
    notifications: notificationReducer,
    auth: authReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
