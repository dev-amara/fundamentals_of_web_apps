const blogsRouter = require('express').Router()
const bodyParser = require("body-parser");
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const textParser = bodyParser.text();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    const error = new Error('token missing or invalid')
    error.name = 'Authentification'
    throw error
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog
    .populate({ path: 'user', select: ['name', 'username'] })
    .execPopulate()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', textParser, async (req, res, next) => {
  const { body, token } = req

  let error
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    if (!token || !decodedToken.id) {
      const error = new Error('Invalid or missing authentication token')
      error.name = 'Authentication Error'
    }

    if (typeof body !== 'string') {
      error = new Error('"Comment is not a string"')
      error.name = 'Bad Request'
    }

    const blog = await Blog.findById(req.params.id)
    if (blog) {
      blog.comments = blog.comments.concat(body)
      const savedBlog = await blog.save()
      await savedBlog
        .populate({ path: 'user', select: ['name', 'username'] })
        .execPopulate()
      res.status(200).json(savedBlog.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()

  const blogUpdate = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes,
    },
    { runValidators: true, context: 'query', new: true }
  )

  return response.json(blogUpdate.toJSON()).status(200).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  const { token } = request
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  if (!token || !decodedToken.id) {
    const authentication = new Error('Invalid or missing authentication token')
    authentication.name = 'Authentification'
    throw authentication
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()

  if (blog.user.toString() === decodedToken.id.toString()) {
    await blog.remove()
    return response.status(204).end()
  }

  const error = new Error('User is not permitted to modify this resource')
  error.name = 'Forbidden'
  throw error
})

module.exports = blogsRouter
