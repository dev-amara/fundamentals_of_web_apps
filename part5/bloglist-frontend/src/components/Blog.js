import React, { useState } from "react";

const Blog = ({ blog }) => {
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
          <button type="button" onClick={(event) => event.preventDefault()}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
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

export default Blog;
