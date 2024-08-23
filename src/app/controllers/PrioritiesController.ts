import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const addPriorities = async (req, res) => {
    try {
        const addPriorities = await prisma.priorities.createMany({
            data: {
                priorities_name: req.body.priorities_name,
                user_id: req.body.user_id
            }
        })
        if(addPriorities) {
            res.status(201).json({success: true, message: 'New priority has been added'})
        } else {
            res.status(422).json({success: true, message: 'Add new priority failed'})
        }
    } catch(e) {
        console.error('Internal Server Error, please wait : ' + e)
    }
}