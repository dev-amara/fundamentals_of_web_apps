const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate({
    path: 'blogs',
    select: ['title', 'author', 'url'],
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { body } = request

  if (!body.username || !body.password) {
    const error = new Error('Username or Password missing')
    error.name = 'ValidationError'
    throw error
  }

  if (body.username.length < 3) {
    const error = new Error(
      '`username` is shorter than the minimum allowed length (3)'
    )
    error.name = 'ValidationError'
    throw error
  }

  if (body.password.length < 3) {
    const error = new Error(
      '`password` is shorter than the minimum allowed length (3)'
    )
    error.name = 'ValidationError'
    throw error
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
