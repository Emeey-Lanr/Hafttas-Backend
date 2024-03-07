import jwt from "jsonwebtoken"

export const tokenGeneration = async(time:string, data:any) => {
    const token = jwt.sign(data, `${process.env.TKN_SECRET}`, { expiresIn: `${time}` })
    return token
}

export const tokenDataRetrieval = async(token:string) => {
    const data =  jwt.verify(token, `${process.env.TKN_SECRET}`)
    return data
}