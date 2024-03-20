"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    limit: { type: String, require: true },
    link: { type: String, require: true },
    messageBox: { type: Array },
});
exports.messageModel = mongoose_1.default.model("message", messageSchema);
