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
exports.userValidator = void 0;
const user_validation_schema_1 = require("../utilis/user.validation.schema");
const response_1 = require("../helpers/response");
const userValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = user_validation_schema_1.userSchema.validate(req.body);
    if (error) {
        return (0, response_1.errorResponse)(res, 404, `${error.message}`);
    }
    return next();
});
exports.userValidator = userValidator;
