import { z } from 'zod'

const userLogin = z.object({
    email: z
    .string({message: "Email must be an alphabet character"})
    .email({message: "You must fill the valid email"})
    .min(5, {message: "Email must have more than 5 characters"})
    .trim(),
    password: z
    .string()
    .min(8, {message: "Password must have more than 8 characters (include alphabet and number)"})
})

export default userLogin