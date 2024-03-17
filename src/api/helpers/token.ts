import jwt from "jsonwebtoken"
import { dotenvF } from "../middleware/dotenv"
dotenvF()
export const tokenGeneration = async(time:string, data:any) => {
    const token = jwt.sign(data, `${process.env.TKN_SECRET}`, { expiresIn: `${time}` })
    return token
}

export const tokenDataRetrieval = async (token: string) => {
    try {
            const data = jwt.verify(token, `${process.env.TKN_SECRET}`);
            return data;
    } catch (error:any) {
        return new Error(`${error.message}`)
    }

}

export const passwordResetToken = async () => {
    const number = `${Math.floor(Math.random() * 9)}${Math.floor(
      Math.random() * 9
    )}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`;
     return number
}