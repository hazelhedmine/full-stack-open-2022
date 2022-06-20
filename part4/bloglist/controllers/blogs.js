const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

// registering specific middleware (userExtractor in this case) for
// specific operation
blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    const { url, title, author, likes } = request.body

    try {
      // const decodedToken = jwt.verify(request.token, process.env.SECRET)
      // if (!decodedToken.id) {
      //   return response.status(401).json({ error: 'token missing or invalid' })
      // }
      const user = request.user

      const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes,
        user: user._id,
      })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
    } catch (exception) {
      next(exception)
    }
  }
)

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      // const decodedToken = jwt.verify(request.token, process.env.SECRET)
      // if (!decodedToken.id) {
      //   return response.status(401).json({ error: 'token missing or invalid' })
      // }

      // const user = await User.findById(decodedToken.id)
      const user = request.user
      const blog = await Blog.findById(request.params.id)
      // need to conver to string since blog.user is an object
      if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'wrong user token' })
      }
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  }
)

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
