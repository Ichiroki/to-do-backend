import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logout = async (req: Request, res: Response) => {
    const email = req.body.email;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(user) {
            res.clearCookie('ICHIROKI_SESSION')
            res.end()
            res.status(200).json({success: 'true', message: 'Logout success'})
        } else {
            console.error('There is some mistakes in your code')
        }

    } catch(err) {
        console.error(err)
    }
}