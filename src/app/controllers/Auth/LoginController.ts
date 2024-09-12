import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import userLogin from '../../../services/validation/UserLoginRequest'

const csrf = require('csrf')
const prisma = new PrismaClient()

const token = new csrf()

export const login = async (req: Request, res: Response) => {
    try {
        const validated = userLogin.parse(req.body)

        const user = await prisma.user.findUnique({
            where: {
                email: validated.email
            }
        })
        if(user) {
                await bcrypt.compare(validated.password, user.password)
                .then((response) => {
                    if(response == false) {
                        res.status(422).json({'success': false, 'message': 'Password does not match'})
                    } else {
                        const secret = token.secretSync()
                        const csrfToken = token.create(secret)
    
                        const sign = jwt.sign({user}, 'user_permission')
                        res.locals.token = sign
                        res.locals.csrfToken = csrfToken
                        // res.cookie('ICHIROKI_SESSION', sign, {secure: true, maxAge: 3600000})
                        // res.cookie('csrf-token', csrfToken, {secure: true, maxAge: 3600000})
                        res.status(201).json({email: user.email, message: 'User successfully login', token: sign, csrf: csrfToken})
                    }
                })
                .catch((err) => {
                    if(err instanceof z.ZodError) {
                        res.status(422).json({'success': false, 'errors': err.errors})
                    }
                })
        } else {
            const err = {}
            if(err instanceof z.ZodError) {
                res.status(422).json({success: 'false', errors: err.errors[0].message})
            }

            res.status(500).json({success: 'false', errors: 'Internal Server Error, please wait'})
        }
        }
    catch(err) {
        if(err instanceof z.ZodError) {
            const errors = err.errors.map(e => ({field: e.path[0], message: e.message}))
            res.status(422).json({
                'success': 'failed',
                'errors': err.errors[0].message
            });
        } else {
            console.error(err)
            res.status(500).json({'message': "Internal Server Error"})
        }
    }
}