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

export const updatePriorities = async (req, res) => {
    const id = req.params['priority_id']

    try {
        const priorities = await prisma.priorities.updateMany({
            where:{
                id
            },
            data: {
                priorities_name: req.body.priorities_name,
            }
        })
        if(priorities) {
            res.status(201).json({success: true, message: 'New priority has been added'})
        } else {
            res.status(422).json({success: true, message: 'Add new priority failed'})
        }
    } catch(e) {
        console.error('Internal Server Error, please wait : ' + e)
    }
}

export const deletePriorities = async (req, res) => {
    const id = req.params['priority_id']

    try {
        const priorities = await prisma.priorities.delete({
            where: {
                id
            },
        })
        if(priorities) {
            res.status(201).json({success: true, message: 'New priority has been added'})
        } else {
            res.status(422).json({success: true, message: 'Add new priority failed'})
        }
    } catch(e) {
        console.error('Internal Server Error, please wait : ' + e)
    }
}