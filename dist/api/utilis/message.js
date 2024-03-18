"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const messageScheam = joi_1.default.object({
    username: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
    userEmail: joi_1.default.string().required(),
    anonymousName: joi_1.default.string().required(),
    anonymousLink: joi_1.default.string().required(),
    messageBox: joi_1.default.array().required(),
});
