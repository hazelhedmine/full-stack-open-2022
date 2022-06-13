const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumWithInitial = blogs.reduce(
    (prevBlog, currBlog) => prevBlog + currBlog.likes,
    0
  )

  return sumWithInitial
}

module.exports = {
  dummy,
  totalLikes,
}
