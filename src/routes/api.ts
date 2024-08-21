import {Request, Response} from 'express'
import { addUser, getUser } from '../app/controllers/UserController'

const Express = require('express')
const Api = Express()

Api.get('/test', (req: Request, res: Response) => {
    res.send('<h1>test</h1>')
})

Api.get('/user/:id', getUser)
Api.post('/user', addUser)

module.exports = Api