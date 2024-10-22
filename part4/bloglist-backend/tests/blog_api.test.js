const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const store = {}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }

  const savedUsers = await helper.usersInDb()

  const userForBlogs = {
    username: savedUsers[0].username,
    id: savedUsers[0].id,
  }

  const userForNoBlogs = {
    username: savedUsers[1].username,
    id: savedUsers[1].id,
  }

  const token = await jwt.sign(userForBlogs, process.env.SECRET_KEY)
  const unauthorizedToken = jwt.sign(userForNoBlogs, process.env.SECRET_KEY)

  store.token = `Bearer ${token}`
  store.userBlogId = userForBlogs.id
  store.unauthorizedToken = `Bearer ${unauthorizedToken}`

  const validUserId = savedUsers[0].id

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({ ...blog, user: validUserId })
    await blogObject.save()
  }
})

describe('GET: /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns all blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST: /api/blogs', () => {
  test('new blog saved to db', async () => {
    const newBlog = new Blog(helper.initialBlog)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', store.token)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)

    const id = blogs.map((blog) => blog.id)
    expect(id).toContain(response.body.id)
  })

  test('and the saved blog referencing the user who added it', async () => {
    const newBlog = new Blog(helper.validBlog)

    await api
      .post('/api/blogs')
      .set('Authorization', store.token)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(201)

    const latestBlog = await helper.getLatestBlogInDb()
    expect(latestBlog.user.toString()).toBe(store.userBlogId)
  })

  test('set 0 if like value is missing', async () => {
    const newBlog = new Blog(helper.blogWithoutLike)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', store.token)
      .set('Content-Type', 'application/json')
      .send(newBlog)

    expect(response.body.likes).toBe(0)
  })

  test('that verifies that if the title and url properties are missing from the request data', async () => {
    let blog = new Blog(helper.blogWithoutTitleAndUrl)

    await api
      .post('/api/blogs')
      .set('Authorization', store.token)
      .set('Content-Type', 'application/json')
      .send(blog)
      .expect(400)
  })

  test('fails with status 401 if unauthenticated', async () => {
    const newBlog = new Blog(helper.validBlog)

    await api.post('/api/blogs').send(newBlog).expect(401)
  })
})

describe('DELETE: /api/blogs/id', () => {
  test('fails if id is invalid', async () => {
    const invalidId = '1234rgj8900j0'
    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', store.token)
      .expect(400)
  })

  test('fails if the blog doesnt exist', async () => {
    const id = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', store.token)
      .expect(404)
  })

  test('fails with status 403 if the blog doesnt ref auth user', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', store.unauthorizedToken)
      .expect(403)
  })

  test('deletes the blog member with that id if valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', store.token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const blogIds = blogsAtEnd.map((blog) => blog.id)
    expect(blogIds).not.toContain(blogToDelete.id)
  })
})

describe('PUT: /api/blogs/id', () => {
  test('fails if id is invalid', async () => {
    const invalidId = '1234rgj8900j0'
    await api.put(`/api/blogs/${invalidId}`).expect(400)
  })

  test('fails if the blog doesnt exist', async () => {
    const id = await helper.nonExistingId()
    await api.put(`/api/blogs/${id}`).expect(404)
  })

  test('fails with status 400 if the new object is invalid', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]
    const updateWithNoTitle = { ...blog, title: null }
    const updatetWithNoUrl = { ...blog, url: null }

    await api
      .put(`/api/blogs/${blog.id}`)
      .set('Content-Type', 'application/json')
      .send(updateWithNoTitle)
      .expect(400)

    await api
      .put(`/api/blogs/${blog.id}`)
      .set('Content-Type', 'application/json')
      .send(updatetWithNoUrl)
      .expect(400)
  })

  test('succesfully update the blog member with one valid request', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]
    const blogUpdate = { ...blog, likes: 9999 }

    await api
      .put(`/api/blogs/${blog.id}`)
      .set('Content-Type', 'application/json')
      .send(blogUpdate)
      .expect(200)

    const blogsAfter = await helper.blogsInDb()
    const blogAfter = blogsAfter.filter((b) => b.id === blog.id)[0]
    expect(blogAfter.likes).toBe(blogUpdate.likes)
  })
})

describe('POST /api/users', () => {
  test('fails with status 400 if the user is invalid', async () => {
    await api
      .post('/api/users')
      .send({ name: 'amara', password: '12345' })
      .set('Content-Type', 'application/json')
      .expect(400)

    await api
      .post('/api/users')
      .send({ name: 'amara', username: 'dev-amara' })
      .set('Content-Type', 'application/json')
      .expect(400)
  })

  describe('fails with status 400', () => {
    test('username is not unique', async () => {
      const username = helper.initialUsers[0].username

      const response = await api
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({ username: username, name: 'amara', password: '12345' })
        .expect(400)

      const uniqueMessage = /unique/.test(response.body.error)
      expect(uniqueMessage).toBe(true)
      expect(response.body.error).toContain('username')

      const users = await helper.usersInDb()
      expect(users.length).toBe(helper.initialUsers.length)
    })

    test('username is less than 3 chars', async () => {
      const response = await api
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({ username: 'am', name: 'am', password: '12' })
        .expect(400)

      const minLengthRegex = /minimum allowed length \(\d+\)/
      const isMinLengthError = minLengthRegex.test(response.body.error)
      expect(isMinLengthError).toBe(true)
      expect(response.body.error).toContain('username')

      const users = await helper.usersInDb()
      expect(users.length).toBe(helper.initialUsers.length)
    })

    test('password is less than 3 chars', async () => {
      const response = await api
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({ username: 'okokok', name: 'amara', password: '12' })
        .expect(400)

      const minLengthRegex = /minimum allowed length \(\d+\)/
      const isMinLengthError = minLengthRegex.test(response.body.error)
      expect(isMinLengthError).toBe(true)
      expect(response.body.error).toContain('password')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })
  })

  test('saves the user to db if valid', async () => {
    const user = {
      username: 'bamba',
      name: 'bamba',
      password: 'bamba',
    }

    await api
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(user)
      .expect(201)

    const users = await helper.usersInDb()
    expect(users.length).toBe(helper.initialUsers.length + 1)

    const usernames = users.map((user) => user.username)
    expect(usernames).toContain(user.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
