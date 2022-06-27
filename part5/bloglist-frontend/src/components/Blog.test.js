// import React from 'react'
// import '@testing-library/jest-dom/extend-expect'
// import { render } from '@testing-library/react'
// import Blog from './Blog'

// test('renders content', () => {
//   const blog = {
//     title: 'hello testing renders content',
//     author: 'author',
//     likes: 1,
//     url: 'www.123.com',
//   }

//   const user = {
//     name: 'test',
//   }
//   // renders the component with render function
//   // in a format suitable for tests without rendering to DOM
//   const { container } = render(<Blog user={user} blog={blog} />)

//   const div = container.querySelector('.blog')
//   expect(div).toHaveTextContent('hello testing renders content')
// })
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Togglable />', () => {
  let container
  let updateBlog

  beforeEach(() => {
    const user = {
      id: '62b02c99bb2bc6bb96d41b6c',
      name: 'testtoken',
      username: 'testtoken',
    }

    const blog = {
      title: 'hello testing renders content',
      author: 'author',
      likes: 10,
      url: 'www.123.com',
      user: user,
    }

    updateBlog = jest.fn()

    container = render(
      <Blog user={user} blog={blog} updateBlog={updateBlog}></Blog>
    ).container
  })

  test('renders its children', () => {
    screen.findAllByText('hello testing renders content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableBlog')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableBlog')
    expect(div).not.toHaveStyle('display: none')
  })

  test('when like button is clicked twice, event handler is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(updateBlog.mock.calls).toHaveLength(2)
    // cannot use the below since likes is not actually updated
    // so its just 10 + 1 each time
    // expect(updateBlog.mock.calls[0][0].likes).toBe(12)
  })
})
