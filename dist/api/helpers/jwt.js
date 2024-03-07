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
exports.tokenDataRetrieval = exports.tokenGeneration = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("../middleware/dotenv");
(0, dotenv_1.dotenvF)();
const tokenGeneration = (time, data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign(data, `${process.env.TKN_SECRET}`, { expiresIn: `${time}` });
    return token;
});
exports.tokenGeneration = tokenGeneration;
const tokenDataRetrieval = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const data = jsonwebtoken_1.default.verify(token, `${process.env.TKN_SECRET}`);
    return data;
});
exports.tokenDataRetrieval = tokenDataRetrieval;
