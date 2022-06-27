import { useState } from 'react'

const BlogForm = ({ user, addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: URL,
      user: user,
      likes: 0,
    }
    console.log('blogObject :>> ', blogObject)
    addBlog(blogObject, title, author)
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <form className="blogForm" onSubmit={handleAddBlog}>
      <h2>create new</h2>
      <div className="blogFormTitle">
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          required
        ></input>
      </div>
      <div className="blogFormAuthor">
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          required
        ></input>
      </div>
      <div className="blogFormURL">
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
}

export default BlogForm
