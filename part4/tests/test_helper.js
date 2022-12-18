const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Initial Blog One",
        author: "TesterOne",
        url: "https://fullstackopen.com/en/part4/testing_the_backend",
        likes: 50
    },
    {
        title: "Initial Blog Two",
        author: "TesterTwo",
        url: "https://fullstackopen.com/en/part4/token_authentication",
        likes: 50
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON()) 
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}