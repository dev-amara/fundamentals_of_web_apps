import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleShowDetails = () => {
    setShowDetails((prevState) => !prevState)
  }

  const belongsToUser = blog.user.username === user.username

  const display = () => {
    return showDetails ? (
      <>
        <div>
          {blog.title} {blog.author}{' '}
          <button type="button" onClick={toggleShowDetails}>
            hide
          </button>
        </div>
        <div className='url'>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </div>
        <div className='like'>
          likes {blog.likes}{' '}
          <button className="btn_like" type="button" onClick={() => handleLike(blog.id)}>
            like
          </button>
        </div>
        <div className='user'>{blog.author}</div>
        {belongsToUser && (
          <div>
            <button
              id='remove'
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
        <button type="button" onClick={setShowDetails} className='view'>
          view
        </button>
      </>
    )
  }

  return <div style={blogStyle}>{display()}</div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
