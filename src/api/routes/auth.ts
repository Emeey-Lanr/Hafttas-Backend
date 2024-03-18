import express from "express";
import { userSigninValidator, userValidator,  } from "../validator/user.validator";
import { UserC } from "../controllers/auth";
export const userAuthRoutes = express.Router();
userAuthRoutes.post('/signup', userValidator, UserC.Signup)
userAuthRoutes.post('/signin', userSigninValidator, UserC.Signin)
userAuthRoutes.post('/forgot/password', UserC.ForgotPassword)
userAuthRoutes.post("/forgot/password/pin/verification", UserC.forgotPassword4DigitPinsVerification)
userAuthRoutes.get("/verify/password/token", UserC.verifyNewPasswordToken)
userAuthRoutes.post("/resetPassword", UserC.resetPassword)