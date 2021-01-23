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

  test('set 0 if like value is missing', async () => {
    const newBlog = new Blog(helper.blogWithoutLike)

    const response = await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(newBlog)

    expect(response.body.likes).toBe(0)
  })

  test('that verifies that if the title and url properties are missing from the request data', async () => {
    let blog = new Blog(helper.blogWithoutTitleAndUrl)

    await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(blog)
      .expect(400)
  })
})

describe('DELETE: /api/blogs/id', () => {
  test('fails if id is invalid', async () => {
    const invalidId = '1234rgj8900j0'
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('fails if the blog doesn\'t exist', async () => {
    const id = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${id}`)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
