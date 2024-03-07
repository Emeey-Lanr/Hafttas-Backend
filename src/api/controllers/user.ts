import { Response, Request } from "express";
import { UserS } from "../services/user";
import { errorResponse, succesResponse } from "../helpers/response";

export class UserC {
  static async Signup(req: Request, res: Response) {
    try {
      const createUser = await UserS.signup(req.body)
      if (createUser instanceof Error) {
        return errorResponse(res, 400, `${createUser.message}`)
      }
      return succesResponse(res, 200, 'User created succesfully', createUser)
    } catch (error:any) {
      return errorResponse(res, 500, `${error.message}`)
    }
  }
}
