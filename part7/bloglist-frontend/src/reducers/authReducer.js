import loginService from "../services/login";
import blogsService from "../services/blogs";
import { displayNotification } from "./notificationReducer";

const generateInitialState = () => {
    const logged = localStorage.getItem("loggedBlogappUser");
    if (logged) {
        const user = JSON.parse(logged);
        blogsService.setToken(user.token);
        return { user };
    } else {
        return { user: null };
    }
};

const authReducer = (state = generateInitialState(), action) => {
    switch (action.type) {
        case "SET_USER":
            return { user: action.user };
        case "CLEAR_USER":
            return { user: null };
        default:
            return state;
    }
};

export const login = (user) => {
    return async (dispatch) => {
        try {
            const authUser = await loginService.login(user);
            blogsService.setToken(authUser.token);
            dispatch({ type: "SET_USER", user: authUser });
            localStorage.setItem("loggedBlogappUser", JSON.stringify(authUser));
            dispatch(displayNotification(`Logged in as ${authUser.username}`, 5000));
        } catch (e) {
            dispatch(displayNotification(`wrong credentials`, 5000, `warning`));
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        blogsService.setToken(null);
        localStorage.removeItem("loggedBlogappUser");
        dispatch({ type: "CLEAR_USER" });
        dispatch(displayNotification("Logged out", 5000));
    };
};

export default authReducer;
