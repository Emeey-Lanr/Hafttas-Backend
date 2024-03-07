"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_validator_1 = require("../validator/user.validator");
const user_1 = require("../controllers/user");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.post('/signup', user_validator_1.userValidator, user_1.UserC.Signup);
exports.userRoutes.post('/signin', user_validator_1.userSigninValidator, user_1.UserC.Signin);
