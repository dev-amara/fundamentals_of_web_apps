const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Amara Bamba',
    url: 'http://localhost:3001',
    likes: 1000,
  },
  {
    title: 'JAVA is not easy',
    author: 'Amara Bouake',
    url: 'http://localhost:3003',
    likes: 3500,
  },
]

const initialBlog = {
  title: 'GIT is easy',
  author: 'Ble Serge',
  url: 'http://localhost:3001',
  likes: 1000,
}

const blogWithoutLike = {
  title: 'Symfony is cool',
  author: 'Ble Regis',
  url: 'http://localhost:3091',
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Js is very good',
    author: 'Ib Bamba',
    url: 'http://localhost:3002',
    likes: 10000,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((note) => note.toJSON())
}

module.exports = {
  initialBlogs,
  initialBlog,
  nonExistingId,
  blogsInDb,
  blogWithoutLike
}
