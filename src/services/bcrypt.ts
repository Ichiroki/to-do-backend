import bcrypt from 'bcrypt'

const saltRounds = 10

function hashPassword(rounds: number, password: string) {
    const hash = bcrypt.hashSync(password, rounds)

    return hash
}

export default hashPassword