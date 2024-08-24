import {Request, Response} from 'express'
import { addUser, getUser } from '../app/controllers/UserController'
import { login } from '../app/controllers/Auth/LoginController'
import { logout } from '../app/controllers/Auth/LogoutController'
import { addPriorities } from '../app/controllers/PrioritiesController'
import { addTask, deleteTask, updateTask } from '../app/controllers/TaskController'

const Express = require('express')
const Api = Express()

Api.get('/test', (req: Request, res: Response) => {
    res.send('<h1>test</h1>')
})

Api.get('/user/', getUser)
Api.post('/user', addUser)

Api.post('/login', login)
Api.post('/logout', logout)

Api.post('/priorities/create', addPriorities)

Api.post('/task/create', addTask)
Api.post('/task/:task_id/update', updateTask)
Api.post('/task/:task_id/delete', deleteTask)


module.exports = Api