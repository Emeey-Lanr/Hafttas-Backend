"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = exports.messageSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.messageSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    limit: joi_1.default.number().required(),
    messageBox: joi_1.default.array().required(),
});
exports.sendMessageSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    link: joi_1.default.string().required(),
    message: joi_1.default.string().max(250).required(),
    date: joi_1.default.string().required(),
    time: joi_1.default.string().required(),
});
