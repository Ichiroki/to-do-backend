import {Request, Response} from 'express'
import { addUser, getUser } from '../app/controllers/UserController'
import { login } from '../app/controllers/Auth/LoginController'
import { logout } from '../app/controllers/Auth/LogoutController'

const Express = require('express')
const Api = Express()

Api.get('/test', (req: Request, res: Response) => {
    res.send('<h1>test</h1>')
})

Api.get('/user/', getUser)
Api.post('/user', addUser)

Api.post('/login', login)
Api.post('/logout', logout)

module.exports = Api