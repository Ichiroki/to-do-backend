import { Request, Response } from 'express'

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('ICHIROKI_SESSION')
        res.end()
        res.status(200).json({success: 'true', message: 'Logout success'})
    } catch(err) {
        console.error(err)
    }
}