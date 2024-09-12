import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { login } from '../app/controllers/Auth/LoginController'
import { logout } from '../app/controllers/Auth/LogoutController'
import { addPriorities } from '../app/controllers/PrioritiesController'
import { addTask, deleteTask, updateTask } from '../app/controllers/TaskController'
import { addUser, getUser } from '../app/controllers/UserController'
import { IGetUserAuth } from '../types/UserTypes'

const Express = require('express')
const Api = Express()

Api.get('/test', (req: Request, res: Response) => {
    res.send('<h1>test</h1>')
})

Api.get('/user/', getUser)
Api.post('/user', addUser)

Api.post('/login', login)
Api.post('/logout', logout)

Api.post('/priorities/create', (req: IGetUserAuth, res, next) => {
    const token = localStorage.getItem('token')

    const parsedToken = JSON.stringify(token)
    if(!parsedToken) {
        return res.json({message: 'Access Denied'}, 403)
    } else {
        try {
            const decoded = jwt.verify(parsedToken, 'user_permission')
            req.user = decoded
            next()
        } catch(err) {
            return res.status(401).json({message: 'Invalid token'})
        }
    }

}, (req: IGetUserAuth, res) => {
    res.status(200).json(req.user)
}, addPriorities)

Api.post('/task/create', (req: IGetUserAuth, res, next) => {
    const token = localStorage.getItem('token')

    const parsedToken = JSON.stringify(token)
    if(!parsedToken) {
        return res.json({message: 'Access Denied'}, 403)
    } else {
        try {
            const decoded = jwt.verify(parsedToken, 'user_permission')
            req.user = decoded
            next()
        } catch(err) {
            return res.status(401).json({message: 'Invalid token'})
        }
    }

}, addTask)
Api.post('/task/:task_id/update', (req: IGetUserAuth, res, next) => {
    const token = req.cookies['ICHIROKI_SESSION']
    if(!token) {
        return res.json({message: 'Access Denied'}, 403)
    } else {
        try {
            const decoded = jwt.verify(token, 'user_permission')
            req.user = decoded
            next()
        } catch(err) {
            return res.status(401).json({message: 'Invalid token'})
        }
    }

}, (req: IGetUserAuth, res) => {
    res.status(200).json(req.user)
}, updateTask)
Api.post('/task/:task_id/delete', (req: IGetUserAuth, res, next) => {
    const token = req.cookies['ICHIROKI_SESSION']
    if(!token) {
        return res.json({message: 'Access Denied'}, 403)
    } else {
        try {
            const decoded = jwt.verify(token, 'user_permission')
            req.user = decoded
            next()
        } catch(err) {
            return res.status(401).json({message: 'Invalid token'})
        }
    }

}, (req: IGetUserAuth, res) => {
    res.status(200).json(req.user)
}, deleteTask)

module.exports = Api