import { Request, Response, NextFunction } from "express"
import { userSchema, userSigninSchema } from "../utilis/user.validation.schema"
import { errorResponse } from "../helpers/response"
export const userSigninValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSigninSchema.validate(req.body)
    if (error) {
        return errorResponse(res, 400, `${error.message}`)
    }
    return next()
}
export const userValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return errorResponse(res, 400, `${error.message}`);
  }
  return next();
};