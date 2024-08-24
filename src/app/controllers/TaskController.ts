import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const addTask = async (req, res) => {
    try {
        const task = await prisma.task.createMany({
            data: {
                task_name: req.body.task_name,
                user_id: req.body.user_id,
                is_complete: false,
                description: req.body.description,
                priorities_id: req.body.priorities_id
            },
        })
        if(task) {
            res.status(201).json({success: true, message: 'New task has been added', task})
        } else {
            res.status(422).json({success: true, message: 'Add new task failed'})
        }
    } catch(e) {
        console.error('Internal Server Error, please wait : ' + e)
    }
}

export const updateTask = async (req, res) => {
    const taskId = parseInt(req.params['task_id'])
    try {
        const task = await prisma.task.updateMany({
            where: {
                id: taskId
            },
            data: {
                task_name: req.body.task_name,
                user_id: req.body.user_id,
                priorities_id: req.body.priorities_id,
                description: req.body.description
            }
        })
        if(task) {
            res.status(201).json({success: true, message: 'This task has been updated', task})
        } else {
            res.status(422).json({success: true, message: 'This task failed to be updated'})
        }
    } catch(e) {
        console.error('Internal Server Error, please wait : ' + e)
    }
}

export const deleteTask = async (req, res) => {
    const taskId = parseInt(req.params['task_id'])
    try {
        const task = await prisma.task.delete({
            where: {
                id: taskId
            },
        })
        if(task) {
            res.status(201).json({success: true, message: 'This task has successfully deleted'})
        } else {
            res.status(422).json({success: true, message: 'This task failed to be deleted'})
        }
    } catch(e) {
        console.error('Internal Server Error, please wait : ' + e)
    }
}