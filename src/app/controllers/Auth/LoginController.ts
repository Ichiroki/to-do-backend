import { User } from '../../models/User'
import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import hashPassword from '../../../services/bcrypt'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const csrf = require('csrf')
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
                        console.log(err)
                    }
                })
                const secret = csrf.secretSync()
                const csrfToken = csrf.create(secret)

                const sign = jwt.sign({user}, 'user_permission')
                res.cookie('ICHIROKI_SESSION', sign, {secure: true, maxAge: 3600000})
                res.status(201).json({email: user.email, message: 'User successfully login', sign, csrf: csrfToken})
        } else {
            res.status(422).json({success: 'false', message: 'Email does not exist'})
        }
        }
    catch(err) {
        console.error(err)
    }
}