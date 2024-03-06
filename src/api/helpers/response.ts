import { Response } from "express"
export const errorResponse = (res:Response, statusCode:number,message:string) => {
 return  res.status(statusCode).json({message})
}

export const succesResponse = (res:Response, statusCode:number, message:string,data:any) => {
     return res.status(statusCode).json({message, data})
}