const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const res = require('express/lib/response')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const passwordHash = await bcrypt.hash('testing', 10)
    const user = new User({ username: 'tester', passwordHash })
    
    const promiseArray = blogObjects.map(blog => blog.save())
    await user.save()
    
    await Promise.all(promiseArray)
})

describe('Blog list tests', () => {

    test('blogs are returning the correct number of blog posts', async () => {
        const response = await api.get('/api/blogs')
        
        expect(response.body).toHaveLength(helper.initialBlogs.length)
        
    })
    
    test('blogs have unique identifier property named as id', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()  
        })
        
    })
    
    test('blog can be added', async () => {
        const blogsBefore = await helper.blogsInDb()
        const initialUser = {
            username: "tester",
            password: "testing"
        }
        
        const response = await api
                        .post('/api/login')
                        .send(initialUser)

        const newBlog = {
            title: "testWithToken",
            author: "tokenMan",
            url: "www.testingurl.com",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${response.body.token}`})
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await api.get('/api/blogs')
        expect(blogsAfter.body).toHaveLength(blogsBefore.length + 1)

        const titles = blogsAfter.body.map(blog => blog.title)
        expect(titles).toContain('testWithToken')
        
    }, 10000)

    test('blog without token fails', async () => {
        
        const newBlog = {
            title: "testWithoutToken",
            author: "tokenMan",
            url: "www.testingurl.com",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        
    })

    test('new blog request with likes field missing sets likes to 0', async () => {
        const initialUser = {
            username: "tester",
            password: "testing"
        }
        
        const response = await api
                        .post('/api/login')
                        .send(initialUser)
        
        const newBlog = {
            title: "likesTest",
            author: "Dinku",
            url: "www.testingurl.com"
        }
    
        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${response.body.token}`})
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        const blogToCheck = blogsAtEnd[blogsAtEnd.length-1]
    
        expect(blogToCheck.likes).toBe(0)
    })
    
    test('blog with missing title and url is responded with 400', async () => {
        const blogsBefore = await helper.blogsInDb()
        const initialUser = {
            username: "tester",
            password: "testing"
        }
        
        const response = await api
                        .post('/api/login')
                        .send(initialUser)
    
        const newBlog = {
            author: "Dinku",
            likes: 0
        }
    
        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${response.body.token}`})
            .send(newBlog)
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsBefore.length)
        
    })
})


describe('Blog list expansions', () => {
    test('delete a single blog post', async () => {
        const initialUser = {
            username: "tester",
            password: "testing"
        }
        
        const response = await api
                        .post('/api/login')
                        .send(initialUser)

        const newBlog = {
            title: "deleteTest",
            author: "Dinku",
            url: "www.testingurl.com"
        }
    
        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${response.body.token}`})
            .send(newBlog)
        
        const blogsBefore = await helper.blogsInDb()
        const blogToDelete = blogsBefore[blogsBefore.length-1]
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({'Authorization': `bearer ${response.body.token}`})
            .expect(204)
    
        const blogsAfter = await helper.blogsInDb()
    
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
    
        const contents = blogsAfter.map(blog => blog.title)
    
        expect(contents).not.toContain(blogToDelete.title)
    }, 20000)
    
    test('update an individual blog post', async () => {
        const initialUser = {
            username: "tester",
            password: "testing"
        }
        
        const response = await api
                        .post('/api/login')
                        .send(initialUser)
        
        const newBlog = {
            title: "updateTest",
            author: "Dinku",
            url: "www.testingurl.com"
        }
    
        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${response.body.token}`})
            .send(newBlog)
        
        const blogsBefore = await helper.blogsInDb()
        const blogToUpdate = blogsBefore[blogsBefore.length-1]
    
        expect(blogToUpdate.likes).toBe(0)
        
        const update = {
            title: "updateTest",
            author: "Dinku",
            url: "www.testingurl.com",
            likes: 12
        }
    
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set({'Authorization': `bearer ${response.body.token}`})
            .send(update)
            .expect(200)
    
        const blogsAfter = await helper.blogsInDb()
    
        expect(blogsAfter[blogsAfter.length - 1].likes).not.toBe(blogToUpdate.likes)
    
    })
})

describe('invalid user data', () => {
    test('username is missing', async () => { 
        const newUser = {
            name: 'Tinku',
            password: 'test'
        }
        const blogsBefore = await helper.blogsInDb()
        const response = await api
                            .post('/api/users')
                            .send(newUser)
        const blogsAfter = await helper.blogsInDb()
        
        expect(response.status).toBe(401)
        expect(response.text).toContain("password or username missing")
        expect(blogsAfter).toHaveLength(blogsBefore.length)
        
    })

    test('password is missing', async () => {
        const newUser = {
            username: 'gussy',
            name: 'Tinku',
        }
        const blogsBefore = await helper.blogsInDb()
        const response = await api
                            .post('/api/users')
                            .send(newUser)

        const blogsAfter = await helper.blogsInDb()
        
        expect(response.status).toBe(401)
        expect(response.text).toContain("password or username missing")
        expect(blogsAfter).toHaveLength(blogsBefore.length)
        
    })
})

describe('basic tests for user', () => {

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "test",
            name: "test",
            password: "test" 
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
         
    }, 20000)
})

afterAll(() => {
    mongoose.connection.close()
})