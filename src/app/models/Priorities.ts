import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class Priorities {
    constructor(
        public readonly id: number,
        public priorities_name: string,
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