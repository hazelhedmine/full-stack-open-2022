import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) // empty array ensures that effect is executed only when the component is rendered for the first time

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('') // form fields emptied
      setPassword('')
      setErrorMessage(`${user.name} logged in!`)
      setMessageType('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleAddBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: URL,
      user: user,
    }

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${title} by ${author} added!`)
        setMessageType('success')
        setTitle('')
        setAuthor('')
        setURL('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage('Field(s) missing')
        setMessageType('error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <form onSubmit={handleAddBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          required
        ></input>
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          required
        ></input>
      </div>
      <div>
        url:
        <input
          type="text"
          value={URL}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
          required
        ></input>
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <Notification message={errorMessage} type={messageType} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{' '}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
