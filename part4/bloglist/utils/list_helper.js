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

const favouriteBlog = (blogs) => {
  const highest = Math.max.apply(
    Math,
    blogs.map(function (blog) {
      return blog.likes
    })
  )

  const blog = blogs.find(function (o) {
    return o.likes == highest
  })

  if (blog) {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }
  } else {
    return {
      title: '',
      author: '',
      likes: '',
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}
