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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserS = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
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
                const hashPassword = yield bcryptjs_1.default.hash(password, 5);
                const token = yield (0, jwt_1.tokenGeneration)('4hrs', { username, email });
                const userData = Object.assign(Object.assign({}, body), { img_url: '' });
                const addUser = new user_model_1.userModel(userData);
                const saveToDb = yield addUser.save();
                return { userInfo: saveToDb, token };
            }
            catch (error) {
                return new Error(`${error.message}`);
            }
        });
    }
}
exports.UserS = UserS;
