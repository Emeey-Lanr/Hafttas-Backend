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
const jwt_1 = require("../helpers/jwt");
const search_1 = require("../helpers/search");
const hash_dehash_1 = require("../helpers/hash.dehash");
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
                const token = yield (0, jwt_1.tokenGeneration)('4hrs', { username, email });
                const userData = { username, email, password: hashedPassword, img_url: '' };
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
                const token = yield (0, jwt_1.tokenGeneration)("4hrs", { username: data.username, email: data.email });
                return token;
            }
            catch (error) {
                return new Error(`${error.message}`);
            }
        });
    }
}
exports.UserS = UserS;
