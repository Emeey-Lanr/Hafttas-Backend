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
const user_1 = require("../services/user");
const response_1 = require("../helpers/response");
class UserC {
    static Signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUser = yield user_1.UserS.signup(req.body);
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
}
exports.UserC = UserC;
