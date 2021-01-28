import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  test('displaying a blog renders the blog\'s title and author', () => {
    const user = { username: 'dev-amara', name: 'Bamba Amara' }
    const blog = {
      id: '600e0bb5eeaff1599551f219',
      title: 'JS',
      author: 'Bah Al Hassanah',
      url: 'http://js.com',
      likes: 1003,
      user: { username: 'dev-amara', name: 'Bamba Amara' },
    }
    const component = render(<Blog blog={blog} user={user} />)

    expect(component.container).toHaveTextContent('JS')
    expect(component.container).toHaveTextContent('Bah Al Hassanah')

    const url = component.container.querySelector('.url')
    expect(url).toBe(null)
    const like = component.container.querySelector('.like')
    expect(like).toBe(null)
  })
})
