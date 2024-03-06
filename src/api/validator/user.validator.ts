import { Request, Response, NextFunction } from "express"
import { userSchema } from "../utilis/user.validation.schema"
import { errorResponse } from "../helpers/response"
export const userValidator = async(req:Request, res:Response, next:NextFunction) => {
   
        const { error } = userSchema.validate(req.body)
        if (error) {
            return errorResponse(res, 404, `${error.message}`)
        }
        return next()
}