const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 2})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    
    if(!body.password || !body.username) {
        return response.status(401).json({ error: 'password or username missing' })
    } else if (body.password.length < 3 || body.username.length < 3) {
        return response.status(401).json({ error: 'password or username should be atleast 3 characters long' })
    } else {
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })   
        const savedUser = await user.save()
        response.json(savedUser)
    }
})

module.exports = usersRouter