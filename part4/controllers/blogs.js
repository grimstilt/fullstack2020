const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1} )

  response.json(blogs)

  })

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).catch((error) => response.status(404).json({ error: 'Not found' }))
  response.json(blog)
  })  

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user
  
  if (!(body.title && body.url)) {
    response.status(400).json("Bad Request")
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id
    })
      
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.remove(request.params.id)
    await user.save()
    response.status(204).end()
  } else {
    response.status(401).json({ error: "user doesn't have persmission" })
  }
  
})

blogsRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)

})

module.exports = blogsRouter  