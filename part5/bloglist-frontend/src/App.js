import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const blogFormRef = useRef()

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

  const addBlog = (blogObject, title, author) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
        setErrorMessage(`a new blog ${title} by ${author} added!`)
        setMessageType('success')
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

  const updateBlog = (blogObject, id, title, author) => {
    blogService
      .update(id, blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.map((b) => (b.id !== blogObject.id ? b : blogObject)))
        setErrorMessage(`${title} by ${author} updated!`)
        setMessageType('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage('update failed')
        setMessageType('error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

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
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm user={user} addBlog={addBlog}></BlogForm>
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                updateBlog={updateBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
