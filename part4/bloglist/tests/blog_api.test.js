const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs added have id property', async () => {
  const blogs = await helper.blogsInDb()

  const ids = blogs.map((r) => r.id)
  console.log(ids)
  expect(ids).toBeDefined()
})

test('blog is successfully added', async () => {
  const newBlog = {
    title: 'test',
    author: 'testn',
    url: 'test',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((n) => n.title)
  expect(titles).toContain('test')
})

test('blog without likes added will default to 0', async () => {
  const newBlog = {
    title: 'blog without likes added will default to 0',
    author: 'test',
    url: 'test',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const blog = blogsAtEnd.filter(
    (n) => n.title === 'blog without likes added will default to 0'
  )
  console.log(blog)
  expect(blog[0].likes).toBe(0)
})

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'blog without title and url is not added',
    likes: '2',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
