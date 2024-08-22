import { User } from '../../models/User'
import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import hashPassword from '../../../services/bcrypt'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email
        let pw: string = req.body.password
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(user) {
                bcrypt.compare(pw, user.password, function(err, res) {
                    if(pw != user.password) {
                        console.log('password mismatch')
                    }
                })
                const sign = jwt.sign({user}, 'user_permission')
                res.status(201).json({user, message: 'User successfully login', sign})
        } else {
            console.log('email not found')
        }
        }
    catch(err) {
        console.error(err)
    }
}