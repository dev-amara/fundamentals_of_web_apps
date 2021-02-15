import React from "react";
import { connect } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useRouteMatch } from "react-router-dom";
import Comments from "./Comments";

const Blog = ({ blogs, user, belongsToUser, likeBlog, deleteBlog }) => {
    const match = useRouteMatch("/blogs/:id");
    const oneBlog = match ? blogs.find((note) => note.id === match.params.id) : null;

    if (oneBlog) {
        belongsToUser = user.username === oneBlog.user.username;
        console.log(belongsToUser);
    }

    const like = () => {
        likeBlog(oneBlog.id);
    };

    const remove = () => {
        deleteBlog(oneBlog.id);
    };

    return (
        <div>
            {oneBlog && (
                <div>
                    <h2>{oneBlog.title}</h2>
                    <a href={oneBlog.url} target="_blank" rel="noopener noreferrer">
                        {oneBlog.url}
                    </a>
                    <p>
                        {oneBlog.likes} likes{" "}
                        <button type="button" onClick={like}>
                            Like
                        </button>
                    </p>
                    <p>added by {oneBlog.author}</p>
                    {belongsToUser && (
                        <div>
                            <button type="button" onClick={remove}>
                                Delete
                            </button>
                        </div>
                    )}
                    <Comments id={oneBlog.id}/>
                </div>
            )}

        </div>
    );
};

const mapStateToProps = (state) => {
    const { blogs } = state;
    const { user } = state.auth;

    return { blogs, user };
};

export default connect(mapStateToProps, { likeBlog, deleteBlog })(Blog);
