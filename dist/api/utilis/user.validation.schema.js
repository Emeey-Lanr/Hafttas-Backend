"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSigninSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }).min(7).required(),
    password: joi_1.default.string().min(6).required()
});
exports.userSigninSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).required()
});
