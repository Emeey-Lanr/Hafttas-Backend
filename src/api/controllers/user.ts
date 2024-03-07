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

  static async Signin(req: Request, res: Response) {
    try {
      const signinUser = await UserS.Signin(req.body)
      if (signinUser instanceof Error) {
        return errorResponse(res, 404, `${signinUser.message}`)
      }
      return succesResponse(res, 202, 'Valid Login Attempt', {token:signinUser})

    } catch (error:any) {
         return errorResponse(res, 500, `${error.message}`);
    }
    
  }
}
