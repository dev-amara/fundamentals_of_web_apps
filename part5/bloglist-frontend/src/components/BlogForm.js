import React, { useState } from 'react'

const NoteForm = ({ createBlog, setLoginVisible }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)

    setNewBlog({ title: '', author: '', url: '' })
  }

  const onChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target
    newBlog[name] = value
    setNewBlog({ ...newBlog })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={onChange}
          />
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={onChange}
          />
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={onChange}
          />
        </div>
        <button type="submit" onClick={() => setLoginVisible(false)}>
          create
        </button>
        <button type="button" onClick={() => setLoginVisible(false)}>
          cancel
        </button>
      </form>
    </div>
  )
}

export default NoteForm
