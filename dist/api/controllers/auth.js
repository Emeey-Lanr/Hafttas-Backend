"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserC = void 0;
const auth_1 = require("../services/auth");
const response_1 = require("../helpers/response");
class UserC {
    static Signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUser = yield auth_1.UserS.signup(req.body);
                if (createUser instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${createUser.message}`);
                }
                return (0, response_1.succesResponse)(res, 200, 'User created succesfully', createUser);
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 500, `${error.message}`);
            }
        });
    }
    static Signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signinUser = yield auth_1.UserS.Signin(req.body);
                if (signinUser instanceof Error) {
                    return (0, response_1.errorResponse)(res, 404, `${signinUser.message}`);
                }
                return (0, response_1.succesResponse)(res, 202, 'Valid Login Attempt', { token: signinUser });
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 500, `${error.message}`);
            }
        });
    }
    static ForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //  Here a mail sent to the users email that contains 4 codes through his/her
                // email or username provision
                const resetForgotPassword = yield auth_1.UserS.ForgotPassword(`${req.body.usernameOrEmail}`);
                if (resetForgotPassword instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${resetForgotPassword.message}`);
                }
                return (0, response_1.succesResponse)(res, 200, `An email has been sent to @${resetForgotPassword.email} contains a 4 digit pin and expires in 1hr`, resetForgotPassword);
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 500, `${error.message}`);
            }
        });
    }
    static forgotPassword4DigitPinsVerification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verify = yield auth_1.UserS.forgotPassword4DigitPinsVerification(req.body);
                if (verify instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${verify.message}`);
                }
                // The token sent will be used in the frontend as resetpassword?verificationPin={jwtToken}
                return (0, response_1.succesResponse)(res, 200, 'Pin validation attemmpt valid', { jwtToken: verify });
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 404, `${error.message}`);
            }
        });
    }
    static verifyNewPasswordToken(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                // The token will be verified on the onLoad of the page to get the user's data
                const verify = yield auth_1.UserS.verifyNewPasswordToken(`${token}`);
                if (verify instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${verify.message}`);
                }
                return (0, response_1.succesResponse)(res, 200, ' valid', { email: verify.email });
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 404, `${error.message}`);
            }
        });
    }
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPassword = yield auth_1.UserS.resetPassword(req.body);
                if (newPassword instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${newPassword.message}`);
                }
                return (0, response_1.succesResponse)(res, 200, "Password reset done succesfully", { user: newPassword });
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 404, `${error.message}`);
            }
        });
    }
}
exports.UserC = UserC;
