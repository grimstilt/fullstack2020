import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

test('renders only the blog\'s title and author', () => {
  const blog = {
    title: 'Blog content is for testing',
    author: 'Gussy',
    url: 'www.gussylikestesting.com',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container.firstChild).not.toHaveTextContent('likes')
  expect(component.container.firstChild).not.toHaveTextContent('www.gussylikestesting.com')
})

test('clicking the view button shows blog url and likes', () => {
  const blog = {
    title: 'Blog content is for testing',
    author: 'Gussy',
    url: 'www.gussylikestesting.com',
    likes: 5,
    user: {
      'name': 'gussy',
      'id': 12345
    }
  }

  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('View')
  fireEvent.click(button)
  // expect(mockHandler).toBeCalled()
  // component.debug()
  expect(component.container.firstChild).toHaveTextContent('likes')
  expect(component.container.firstChild).toHaveTextContent('www.gussylikestesting.com')
})

test('event handler is called twice when like button is clicked twice', () => {
  const blog = {
    title: 'Blog content is for testing',
    author: 'Gussy',
    url: 'www.gussylikestesting.com',
    likes: 5,
    user: {
      'name': 'gussy',
      'id': 12345
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler}/>
  )
  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('test for new blog form', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Blog content is for testing' }
  })

  fireEvent.change(author, {
    target: { value: 'Gussy' }
  })

  fireEvent.change(url, {
    target: { value: 'www.gussylikestesting.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blog content is for testing')

})