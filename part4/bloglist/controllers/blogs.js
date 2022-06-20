const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const { url, title, author, likes } = request.body

  const user = await User.find({})
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user[0],
  })

  try {
    const savedBlog = await blog.save()
    user[0].blogs = user[0].blogs.concat(savedBlog._id)
    await user[0].save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  // need to declare this way to get rid of id
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    response.status(201).json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
