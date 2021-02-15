import React  from "react";
import { connect } from "react-redux";
import { uid } from "react-uid";
import { commentBlog } from "../reducers/blogReducer";

const Comments = ({ id, comments, commentBlog }) => {
    const addComment = (event) => {
        event.preventDefault();

        const comments = event.target.comments.value;
        console.log(comments);
        event.target.comments.value = "";

        commentBlog(id, comments);
    };

    return (
        <div>
            <h2>comments</h2>
            <form onSubmit={addComment}>
                <div>
                    <input name="comments"  type="text" />
                </div>

                <div>
                    <button
                        type="submit"
                    >
                        Add Comment
                    </button>
                </div>
            </form>

            <div >
                <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {comment.message}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;

    let comments = [];
    const blog = state.blogs.find((blog) => blog.id === id);

    if (blog) {
        comments = blog.comments.map((comment) => {
            return { id: uid({}), message: comment };
        });
    }

    return { id, comments };
};

export default connect(mapStateToProps, { commentBlog })(Comments);
