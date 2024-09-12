import { Request } from 'express'

export interface IGetUserAuth extends Request {
    user: any
}

type UserType = {
    find: void
}

export default UserType