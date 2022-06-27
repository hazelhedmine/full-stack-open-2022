import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = {
    id: '62b02c99bb2bc6bb96d41b6c',
    name: 'testtoken',
    username: 'testtoken',
  }
  const screenUser = userEvent.setup()

  const { container } = render(<BlogForm user={user} addBlog={addBlog} />)

  const titleDiv = container.querySelector('.blogFormTitle')
  const titleInput = titleDiv.querySelector('input')
  const authorDiv = container.querySelector('.blogFormAuthor')
  const authorInput = authorDiv.querySelector('input')
  const URLDiv = container.querySelector('.blogFormURL')
  const URLInput = URLDiv.querySelector('input')
  const sendButton = screen.getByText('create')

  await screenUser.type(titleInput, 'testing a form...')
  await screenUser.type(authorInput, 'author123')
  await screenUser.type(URLInput, 'www.testingaform.com')
  await screenUser.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(addBlog.mock.calls[0][0].author).toBe('author123')
  expect(addBlog.mock.calls[0][0].url).toBe('www.testingaform.com')
})
