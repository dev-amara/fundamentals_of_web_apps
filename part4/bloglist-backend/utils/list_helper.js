// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>  blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => {return sum + blog.likes}, 0)

module.exports = {
  dummy,
  totalLikes,
}
