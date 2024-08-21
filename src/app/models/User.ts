import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class User {
    constructor(
        public readonly id: string,
        public first_name: string,
        public last_name: string,
        public phone: string,
        public nationality: string,
        public email: string,
        public password: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) { }

    static async find (id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user
    }
}