const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  let newUser = {
    username: 'testtoken',
    name: 'testtoken',
    password: 'testtoken',
  }

  let user = {
    username: 'testtoken',
    password: 'testtoken',
  }

  await api.post('/api/users').send(newUser)

  const result = await api.post('/api/login').send(user)
  console.log('result.body :>> ', result.body)
  token = result.body.token
  console.log('token :>> ', token)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have id property', async () => {
    const blogs = await helper.blogsInDb()

    const ids = blogs.map((r) => r.id)
    console.log(ids)
    expect(ids).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'test',
      author: 'testn',
      url: 'test',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' }) //this or below works
      // .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((n) => n.title)
    expect(titles).toContain('test')
  })

  test('succeeds with blogs without likes', async () => {
    const newBlog = {
      title: 'blog without likes added will default to 0',
      author: 'test',
      url: 'test',
    }

    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
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

  test('fails with blogs without title and url', async () => {
    const newBlog = {
      author: 'blog without title and url is not added',
      likes: '2',
    }

    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with blogs without valid token', async () => {
    const newBlog = {
      title: 'test',
      author: 'testn',
      url: 'test',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .auth('1', { type: 'bearer' })
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title: 'test',
      author: 'testn',
      url: 'test',
      likes: 5,
    }

    const result = await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogToDelete = result.body
    console.log('blogToDelete :>> ', blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails if id is invalid', async () => {
    await api.delete(`/api/blogs/1`).auth(token, { type: 'bearer' }).expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('updating of a blog', () => {
  test('succeeds with status code 201 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: 'test123',
      author: 'test',
      url: 'test',
      likes: 10,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].title).toEqual('test123')
  })

  test('fails if id is invalid', async () => {
    const updatedBlog = {
      title: 'test123',
      author: 'test',
      url: 'test',
      likes: 10,
    }

    await api.put(`/api/blogs/1`).send(updatedBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].title).toEqual('React patterns')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
