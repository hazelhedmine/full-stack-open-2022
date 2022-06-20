const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    })
  }
  if (!password) {
    return response.status(400).json({
      error: 'password is missing',
    })
  } else if (!username) {
    return response.status(400).json({
      error: 'username is missing',
    })
  } else if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long',
    })
  } else if (username.length < 3) {
    return response.status(400).json({
      error: 'username must be at least 3 characters long',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
