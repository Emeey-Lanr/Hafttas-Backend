import { errorResponse } from "../helpers/response"
import { messageSchema, sendMessageSchema } from "../utilis/message"
import { Request, Response, NextFunction } from "express"
export const validateOnCreate = (req:Request, res:Response, next:NextFunction) => {
    const { error } = messageSchema.validate(req.body)
    if (error) {
        return errorResponse(res, 400, `${error.message}`)
    }
    return next()
}
 
export const validateOnSend = (req:Request, res:Response, next:NextFunction) => {
    const { error } = sendMessageSchema.validate(req.body)
    if (error) {
        return errorResponse(res, 400, `${error.message}`)
    }
    return next()
}
 