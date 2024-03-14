import express from "express";
import { userSigninValidator, userValidator,  } from "../validator/user.validator";
import { UserC } from "../controllers/user";
export const userRoutes  =  express.Router()
userRoutes.post('/signup', userValidator, UserC.Signup)
userRoutes.post('/signin', userSigninValidator, UserC.Signin)
userRoutes.post('/forgot/password', UserC.ForgotPassword)
userRoutes.post("/forgot/password/pin/verification", UserC.forgotPassword4DigitPinsVerification)