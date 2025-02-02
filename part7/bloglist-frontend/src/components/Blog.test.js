import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

  test('test which checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
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

    const showButton = component.container.querySelector('.view')

    fireEvent.click(showButton)

    expect(component.container).toHaveTextContent('JS')
    expect(component.container).toHaveTextContent('Bah Al Hassanah')
    expect(component.container.querySelector('.url')).toBeDefined()
    expect(component.container.querySelector('.like')).toBeDefined()
    expect(component.container.querySelector('.user')).toBeDefined()
  })

  test('test which ensures that if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const user = { username: 'dev-amara', name: 'Bamba Amara' }
    const blog = {
      id: '600e0bb5eeaff1599551f219',
      title: 'JS',
      author: 'Bah Al Hassanah',
      url: 'http://js.com',
      likes: 1003,
      user: { username: 'dev-amara', name: 'Bamba Amara' },
    }

    const handleLike = jest.fn().mockName('handleLike')

    const component = render(<Blog blog={blog} user={user} handleLike={handleLike}/>)

    const showButton = component.container.querySelector('.view')

    fireEvent.click(showButton)

    const likeBtn = component.container.querySelector('.btn_like')

    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(handleLike).toHaveBeenCalledTimes(2)
  })

})
