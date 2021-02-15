import React  from "react";
import { connect } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ createBlog, setLoginVisible }) => {

    const addBlog = (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const author = event.target.author.value;
        const url = event.target.url.value;

        event.target.title.value = "";
        event.target.author.value = "";
        event.target.url.value = "";

        const newBlog = { title, author, url };
        createBlog(newBlog);
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog} className="form">
                <div>
                    <label>title:</label>
                    <input className="title" type="text" name="title" />
                </div>
                <div>
                    <label>author:</label>
                    <input className="author" type="text" name="author" />
                </div>
                <div>
                    <label>url:</label>
                    <input className="url" type="url" name="url" />
                </div>
                <button id="save" type="submit" onClick={() => setLoginVisible(false)}>
                    create
                </button>
                <button type="button" onClick={() => setLoginVisible(false)}>
                    cancel
                </button>
            </form>
        </div>
    );
};

export default connect(null, { createBlog })(BlogForm);
