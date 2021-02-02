import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/Notifications'
import SuccessNotification from './components/SuccessNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogByOrder = [...blogs].sort((prev, next) => {
    return next.likes - prev.likes
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (id) => {
    const blogs = await blogService.getAll()

    const blogToLike = blogs.filter((blog) => blog.id === id)

    if (blogToLike) {
      try {
        const likedBlog = {
          ...blogToLike[0],
          likes: blogToLike[0].likes + 1,
          user: blogToLike[0].user.id,
        }

        const returnBlog = await blogService.update(id, likedBlog)

        setSuccessMessage(
          `update a blog ${returnBlog.title} by ${returnBlog.author}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)

        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnBlog)))
      } catch (err) {
        setErrorMessage(err.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } else {
      setErrorMessage('blog does not exist')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (newObject) => {
    try {
      const newBlog = await blogService.create(newObject)
      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setBlogs(blogs.concat(newBlog))
    } catch (err) {
      setErrorMessage(err.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      await blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter((p) => p.id !== id))
          setSuccessMessage(
            `Information of ${author} has been removed from the server`
          )
        })
        .catch((error) => {
          console.log(error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} id='form-login'>
        <div>
          <label>username</label>
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>create new note</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog} setLoginVisible={setLoginVisible} />
        </div>
      </>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const userConnected = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  return (
    <div>
      <Notification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in <button id='logout-button' onClick={logOut}>logout</button>
          </p>
          {blogForm()}
          {blogByOrder.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={userConnected}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
