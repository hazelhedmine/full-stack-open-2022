const BlogForm = ({
  handleAddBlog,
  title,
  setTitle,
  author,
  setAuthor,
  URL,
  setURL,
}) => (
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

export default BlogForm
