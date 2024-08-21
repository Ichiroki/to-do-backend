import { User } from '../models/User'
import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import hashPassword from '../../services/bcrypt'

const prisma = new PrismaClient()

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.find(userId)
        if(user) {
            res.status(200).json({user, message: 'User founded'})
        } else {
            res.status(404).json({ message: 'User not found' })
            throw "User not found"
        }
    } catch(err) {
        console.error(err)
    }
}

export const addUser = async (req: Request, res: Response) => {
    try {
        const user = req.body
        const id = crypto.randomUUID()
        const addUser = await prisma.user.create({
            data: {
                id,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                nationality: user.nationality,
                email: user.email,
                password: hashPassword(12, user.password),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        return res.status(201).json({user: addUser, message: 'User successfully added'})
    } catch(err) {
        console.log(err)
    }
}