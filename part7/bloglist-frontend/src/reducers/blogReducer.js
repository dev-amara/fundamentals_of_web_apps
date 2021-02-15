import blogService from "../services/blogs";
import { displayNotification } from "./notificationReducer";

const noteReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_BLOGS":
            return action.data;
        case "NEW_BLOG":
            return [...state, action.data];
        case "UPDATE_BLOG_COMMENTS":
            const blogToComment = state.find((blog) => blog.id === action.id);
            const commentedBlog = { ...blogToComment, comments: action.comments };
            return state.map((blog) => (blog.id === action.id ? commentedBlog : blog));
        case "DELETE_BLOG":
            return state.filter((blog) => blog.id !== action.id);
        default:
            return state;
    }
};

export const initBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch({ type: "INIT_BLOGS", data: blogs });
    };
};

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content);
        dispatch({ type: "NEW_BLOG", data: newBlog });
        dispatch(displayNotification(`You added "${newBlog.title}"`, 5000));
    };
};

export const likeBlog = (id) => {
    return async (dispatch, getState) => {
        const blogToChange = getState().blogs.find((a) => a.id === id);

        const likedBlog = {
            ...blogToChange,
            likes: blogToChange.likes + 1,
        };

        const updatedBlog = await blogService.update(id, likedBlog);

        dispatch({ type: "UPDATE_BLOG", data: updatedBlog });
        dispatch(displayNotification(`You liked for "${updatedBlog.title}"`, 5000));
    };
};

export const deleteBlog = (id) => {
    return async (dispatch, getState) => {
        const blogToDelete = getState().blogs.find((a) => a.id === id);

        const willDelete = window.confirm(`Delete "${blogToDelete.title}"?`);

        if (willDelete) {
            await blogService.deleteBlog(id);

            dispatch({ type: "DELETE_BLOG", id });
            dispatch(displayNotification(`Deleted Blog: "${blogToDelete.title}"`, 5000));
        }
    };
};

export const commentBlog = (id, comment) => {
    return async (dispatch) => {
        try {
            const commentedBlog = await blogService.comment(id, comment);
            const { comments } = commentedBlog;
            dispatch({ type: "UPDATE_BLOG_COMMENTS", id, comments });
            dispatch(displayNotification(`blog has been well commented`, 5000));
        } catch (e) {

        }
    };
};

export default noteReducer;
