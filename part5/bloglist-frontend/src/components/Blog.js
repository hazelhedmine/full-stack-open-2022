import { useState } from 'react'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    padding: '10px 10px',
    border: 'solid',
    borderWidth: 1,
    margin: '5px 0px',
  }

  const handleLike = (event) => {
    event.preventDefault()
    console.log('user :>> ', user)
    const blogObject = {
      user: user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    }

    console.log('blogObject :>> ', blogObject)

    updateBlog(blogObject, blog.id, blog.title, blog.author)
  }

  const handleRemove = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      removeBlog(blog.id, blog.title, blog.author)
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility} type="button">
        {buttonLabel}
      </button>
      <div className="togglableBlog" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div className="blogLikes">
          likes {blog.likes}{' '}
          <button className="like-btn" onClick={handleLike}>
            like
          </button>
        </div>
        <div>{user.name}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
