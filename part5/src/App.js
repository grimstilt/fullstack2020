import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // console.log(blogs)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [message])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage(`${JSON.stringify(error.response.data)}`)
      setTimeout(() => setErrorMessage(null), 1000)
    }
  }

  const handleLike = blog => {
    const newBlog = {
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url
    }
    blogService.update(newBlog)
    setMessage(`You liked ${blog.title}`)
    setTimeout(() => setMessage(null), 1000)
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
      {blogs
        .sort((first, second) => second.likes - first.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            id={user.id}
            handleLike={() => handleLike(blog)}/>
        )
      }
      <BlogForm createBlog={addBlog} />
    </Togglable>

  )

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      if (response.status === 201) {
        setMessage(`A new blog ${response.data.title} by ${response.data.author} added`)
        setTimeout(() => setMessage(null), 1000)
        setBlogs(blogs.concat(response.data))
        blogFormRef.current.toggleVisibility()
      }
    } catch (error) {
      setErrorMessage(`${JSON.stringify(error.response.data)}`)
      setTimeout(() => setErrorMessage(null), 1000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )
  return (
    <div>
      {user === null
        ? <div>
          <h1>Log in to application</h1>
          <Notification message={message} errorMessage={errorMessage} />
          {loginForm()}
        </div>
        : <div>
          <h1>Blogs</h1>
          <Notification message={message} errorMessage={errorMessage} />
          <p>{user.name} is logged in <button onClick={() => {
            window.localStorage.removeItem('loggedUser')
            setUser(null)
          }}>logout</button></p>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App