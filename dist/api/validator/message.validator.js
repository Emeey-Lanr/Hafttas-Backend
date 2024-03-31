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
exports.validateOnCreate = void 0;
const message_1 = require("../utilis/message");
const response_1 = require("../helpers/response");
const validateOnCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = message_1.messageSchema.validate(req.body);
    if (validate.error) {
        return (0, response_1.errorResponse)(res, 400, `${validate.error.message}`);
    }
    return next();
});
exports.validateOnCreate = validateOnCreate;
