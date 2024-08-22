import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class Task {
    constructor(
        public readonly id: number,
        public task_name: string,
        public priorities: number,
        public user: string,
        public description: string,
        public is_complete: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) { }

    static async find (id: number) {
        const user = await prisma.task.findUnique({
            where: {
                id: id
            }
        })

        return user
    }
}