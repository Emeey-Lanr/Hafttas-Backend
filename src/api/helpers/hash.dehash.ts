import bcrypt from "bcryptjs"

export const hashPassword = async (password:string) => {
    const hashedPassword = await bcrypt.hash(password, 5)
    return hashedPassword
}

export const deHashPassword = async (password:string, dbHashedPass:string) => {
    const deHashedPassword = await bcrypt.compare(password, dbHashedPass)
      return deHashedPassword
}