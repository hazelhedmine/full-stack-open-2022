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

  beforeEach(() => {
    const blog = {
      title: 'hello testing renders content',
      author: 'author',
      likes: 1,
      url: 'www.123.com',
    }

    const user = userEvent.setup()
    container = render(<Blog user={user} blog={blog}></Blog>).container
  })

  test('renders its children', () => {
    screen.findAllByText('hello testing renders content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableBlog')
    expect(div).toHaveStyle('display: none')
  })

  //   test('after clicking the button, children are displayed', async () => {
  //     const user = userEvent.setup()
  //     const button = screen.getByText('show...')
  //     await user.click(button)

  //     const div = container.querySelector('.togglableContent')
  //     expect(div).not.toHaveStyle('display: none')
  //   })

  //   test('toggled content can be closed', async () => {
  //     const user = userEvent.setup()
  //     const button = screen.getByText('show...')
  //     await user.click(button)

  //     const closeButton = screen.getByText('cancel')
  //     await user.click(closeButton)

  //     const div = container.querySelector('.togglableContent')
  //     expect(div).toHaveStyle('display: none')
  //   })
})
