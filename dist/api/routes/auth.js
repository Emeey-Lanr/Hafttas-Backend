"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../validator/user");
const auth_1 = require("../controllers/auth");
exports.userAuthRoutes = express_1.default.Router();
exports.userAuthRoutes.post('/signup', user_1.userValidator, auth_1.UserC.Signup);
exports.userAuthRoutes.post('/signin', user_1.userSigninValidator, auth_1.UserC.Signin);
exports.userAuthRoutes.post('/forgot/password', auth_1.UserC.ForgotPassword);
exports.userAuthRoutes.post("/forgot/password/pin/verification", auth_1.UserC.forgotPassword4DigitPinsVerification);
exports.userAuthRoutes.get("/verify/password/token", auth_1.UserC.verifyNewPasswordToken);
exports.userAuthRoutes.post("/resetPassword", auth_1.UserC.resetPassword);
