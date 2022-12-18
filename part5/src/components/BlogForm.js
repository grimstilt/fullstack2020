import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div className='formDiv'>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            id='title'
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id='author'
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            id='url'
            type="text"
            value={url}
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm