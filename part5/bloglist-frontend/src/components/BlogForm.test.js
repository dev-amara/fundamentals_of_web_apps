import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test(' test for the new blog form', () => {

    const createBlog = jest.fn()
    const newBlog = {
      title: 'JS',
      author: 'Bah Al Hassanah',
      url: 'http://js.com'
    }

    const component = render(<BlogForm createBlog={createBlog} />)

    const form = component.container.querySelector('.form')
    const titleInput = component.container.querySelector('.title')
    const authorInput = component.container.querySelector('.author')
    const urlInput = component.container.querySelector('.url')

    fireEvent.change(titleInput, {
      target: { value: newBlog.title },
    })
    fireEvent.change(authorInput, {
      target: { value: newBlog.author },
    })
    fireEvent.change(urlInput, {
      target: { value: newBlog.url },
    })

    fireEvent.submit(form)

    expect(createBlog).toHaveBeenCalledWith(newBlog)
  })
})
