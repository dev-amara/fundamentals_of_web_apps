const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  return authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users')
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
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
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()

  await blog.remove()
  return response.status(204).end()
})

module.exports = blogsRouter
