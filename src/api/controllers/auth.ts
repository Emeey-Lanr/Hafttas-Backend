import { Response, Request } from "express";
import { UserS } from "../services/auth";
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

  static async ForgotPassword(req:Request, res:Response) {
    try {
      //  Here a mail sent to the users email that contains 4 codes through his/her
      // email or username provision
   const resetForgotPassword = await UserS.ForgotPassword(`${req.body.usernameOrEmail}`)
   if(resetForgotPassword instanceof Error){
    return errorResponse(res, 400, `${resetForgotPassword.message}`)
   }
   return succesResponse(res, 200, `An email has been sent to @${resetForgotPassword.email} contains a 4 digit pin and expires in 1hr`, resetForgotPassword)
 
    } catch (error:any) {
     return errorResponse(res, 500, `${error.message}`);
 }
  }

  static async forgotPassword4DigitPinsVerification (req:Request, res:Response){
    try{
      const verify = await UserS.forgotPassword4DigitPinsVerification(req.body)
      if (verify instanceof Error) {
        return errorResponse(res, 400, `${verify.message}`)
      }
      // The token sent will be used in the frontend as resetpassword?verificationPin={jwtToken}
      return succesResponse(res, 200, 'Pin validation attemmpt valid', {jwtToken:verify})
    }catch(error:any){
     return errorResponse(res, 404, `${error.message}`);
    }
  }

  static async verifyNewPasswordToken(req:Request, res:Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1]
      // The token will be verified on the onLoad of the page to get the user's data
      const verify = await UserS.verifyNewPasswordToken(`${token}`)
      if (verify instanceof Error) {
     return errorResponse(res, 400, `${verify.message}`)
      }
         return succesResponse(res, 200, ' valid', {email:verify.email})

    } catch (error:any) {
      return errorResponse(res, 404, `${error.message}`);
    }
  }

  static async resetPassword(req: Request, res:Response) {
    try {
      const newPassword = await UserS.resetPassword(req.body)
      if (newPassword instanceof Error) {
             return errorResponse(res, 400, `${newPassword.message}`);
      }
         return succesResponse(res, 200, "Password reset done succesfully", {user:newPassword});
    } catch (error: any) {
      
      return errorResponse(res, 404, `${error.message}`);
    }
  }
}


