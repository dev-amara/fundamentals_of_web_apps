const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let note of helper.initialBlogs) {
    let noteObject = new Blog(note)
    await noteObject.save()
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
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)

    const id = blogs.map((blog) => blog.id)
    expect(id).toContain(response.body.id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
