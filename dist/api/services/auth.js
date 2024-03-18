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
exports.UserS = void 0;
const user_model_1 = require("../models/user.model");
const token_1 = require("../helpers/token");
const search_1 = require("../helpers/search");
const hash_dehash_1 = require("../helpers/hash.dehash");
const username_email_1 = require("../helpers/username.email");
const mail_1 = require("../helpers/mail");
class UserS {
    static signup(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = body;
            try {
                const userMailExist = yield user_model_1.userModel.findOne({ email });
                if (userMailExist) {
                    return new Error("Email already exist");
                }
                const userUsernameExist = yield user_model_1.userModel.findOne({ username });
                if (userUsernameExist) {
                    return new Error("Username already Exist");
                }
                const hashedPassword = yield (0, hash_dehash_1.hashPassword)(password);
                console.log(hashedPassword);
                const token = yield (0, token_1.tokenGeneration)("4hrs", { username, email });
                const userData = {
                    username,
                    email,
                    password: hashedPassword,
                    img_url: "",
                };
                const addUser = new user_model_1.userModel(userData);
                const saveToDb = yield addUser.save();
                return { userInfo: saveToDb, token };
            }
            catch (error) {
                return new Error(`${error.message}`);
            }
        });
    }
    static Signin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = body;
            try {
                const findUser = yield (0, search_1.userSearch)({ username });
                const { status, data } = findUser;
                if (!status) {
                    return new Error("Invalid Login Crendentails");
                }
                const verifyPassword = yield (0, hash_dehash_1.deHashPassword)(password, `${data.password}`);
                if (!verifyPassword) {
                    return new Error("Invalid Pasword");
                }
                const token = yield (0, token_1.tokenGeneration)("4hrs", {
                    username: data.username,
                    email: data.email,
                });
                return token;
            }
            catch (error) {
                return new Error(`${error.message}`);
            }
        });
    }
    static ForgotPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check if email or username
                const checkIfEmailORUsername = yield (0, username_email_1.usernameOrEmail)(data);
                // use that to determine what to search via username or email to have the user data
                const search = yield (0, search_1.userSearch)(checkIfEmailORUsername === "username"
                    ? { username: data }
                    : { email: data });
                if (!search.status) {
                    return new Error(`Invalid ${checkIfEmailORUsername}`);
                }
                // the 4 digit token generated
                const passwordToken = yield (0, token_1.passwordResetToken)();
                // Then we save the token and the user's email in a jwt token
                const jwtToken = yield (0, token_1.tokenGeneration)("1hr", {
                    email: search.data.email,
                    passwordToken,
                });
                //   the we send the mail
                const sendMailToUser = yield (0, mail_1.sendMail)(`${search.data.email}`, `${passwordToken}`, `${jwtToken}`);
                if (sendMailToUser instanceof Error) {
                    return new Error(`${sendMailToUser.message}`);
                }
                // Then return the user's email, username and a  jwt token that contains the 4 digit pin
                return {
                    email: search.data.email,
                    username: search.data.username,
                    jwtToken,
                };
            }
            catch (error) {
                return new Error("An error occured");
            }
        });
    }
    static forgotPassword4DigitPinsVerification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // we check the token data
                const checkTokenData = (yield (0, token_1.tokenDataRetrieval)(data.jwtToken));
                if (checkTokenData instanceof Error) {
                    return new Error(checkTokenData.message);
                }
                //verify it with the user's pin
                if (String(data.pin) !== checkTokenData.passwordToken) {
                    return new Error("Invalid Reset Pin");
                }
                // Generate a token which is verified on the onload of the new password page at
                // the frontend
                const generateToken = yield (0, token_1.tokenGeneration)("1hr", {
                    verification: true,
                    email: checkTokenData.email,
                });
                return generateToken;
            }
            catch (error) {
                return new Error(`${error.message}`);
            }
        });
    }
    static verifyNewPasswordToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkToken = (yield (0, token_1.tokenDataRetrieval)(token));
                if (checkToken instanceof Error) {
                    return new Error("New Password attempt not allowed");
                }
                return checkToken;
            }
            catch (error) {
                return new Error("An error occured");
            }
        });
    }
    static resetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (data.password.length < 6) {
                    return new Error("Password length must be up or greater than 6");
                }
                const hashedPassword = yield (0, hash_dehash_1.hashPassword)(`${data.password}`);
                const userData = yield (0, search_1.userSearch)({ email: data.email });
                if (!userData.status) {
                    return new Error("User doesn't exist");
                }
                userData.data.password = hashedPassword;
                const updatePassword = yield user_model_1.userModel.findOneAndUpdate({ email: data.email }, userData.data);
                const userDataInfo = yield (0, search_1.userSearch)({ email: data.email });
                return userDataInfo.data;
            }
            catch (error) {
                return new Error("An error occured, resetting newPassword");
            }
        });
    }
}
exports.UserS = UserS;
