// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>  blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => {return sum + blog.likes}, 0)

const favoriteBlog = (blogs) => {
  const reducer = (fav, blog) => {
    if (blog.likes > fav.likes) {
      return { title: blog.title, author: blog.author, likes: blog.likes }
    }
    return fav
  }

  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
