const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>
  blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)

const favoriteBlog = (blogs) => {
  const reducer = (fav, blog) => {
    if (blog.likes > fav.likes) {
      return { title: blog.title, author: blog.author, likes: blog.likes }
    }
    return fav
  }

  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const author = _.chain(_.map(blogs, 'author'))
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value()

  return {
    author: author[0],
    blogs: author[1],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const reducer = (fav, blog) => {
    return !fav[blog.author]
      ? { ...fav, [blog.author]: blog.likes }
      : { ...fav, [blog.author]: fav[blog.author] + blog.likes }
  }

  const likesTally = _.reduce(blogs, reducer, {})

  return _.chain(likesTally)
    .toPairs()
    .maxBy(_.last)
    .keyBy((value) => (typeof value === 'number' ? 'likes' : 'author'))
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
