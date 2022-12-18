import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, id, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showBlog, setShowBlog] = useState('')
  const handleHide = () => setShowBlog('')
  const handleView = () => setShowBlog(blog.title)

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog)
    }
  }

  return (
    <div style={blogStyle}>
      {showBlog === blog.title
        ? <div className='detailedView'>
          <strong>{blog.title}</strong> by {blog.author} <button onClick={handleHide}>hide</button> <br />
          <strong>url:</strong> {blog.url} <br />
          {blog.likes} likes <button id='like' onClick={handleLike}>like</button> <br />
          <strong>user:</strong> {blog.user.name} <br />
          {id === blog.user.id
            ? <button id='remove' onClick={handleRemove}>remove</button>
            : <></>
          }

        </div>
        : <div className='compactView'><strong>{blog.title}</strong> by {blog.author} <button id='view' onClick={handleView}>View</button></div>
      }
    </div>
  )
}

export default Blog