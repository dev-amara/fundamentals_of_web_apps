import React, { useState } from "react";
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShowDetails = (event) => {
    setShowDetails((prevState) => !prevState);
  };

  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));

  const belongsToUser = blog.user.username === user.username;

  const display = () => {
    return showDetails ? (
      <>
        <div>
          {blog.title} {blog.author}{" "}
          <button type="button" onClick={toggleShowDetails}>
            hide
          </button>
        </div>
        <div>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </div>
        <div>
          likes {blog.likes}{" "}
          <button type="button" onClick={() => handleLike(blog.id)}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        {belongsToUser && (
          <div>
            <button
              type="button"
              onClick={() => handleDelete(blog.id, blog.title, blog.author)}
            >
              remove
            </button>
          </div>
        )}
      </>
    ) : (
      <>
        {blog.title} {blog.author}
        <button type="button" onClick={setShowDetails}>
          view
        </button>
      </>
    );
  };

  return <div style={blogStyle}>{display()}</div>;
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog;
