"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOnSend = exports.validateOnCreate = void 0;
const response_1 = require("../helpers/response");
const message_1 = require("../utilis/message");
const validateOnCreate = (req, res, next) => {
    const { error } = message_1.messageSchema.validate(req.body);
    if (error) {
        return (0, response_1.errorResponse)(res, 400, `${error.message}`);
    }
    return next();
};
exports.validateOnCreate = validateOnCreate;
const validateOnSend = (req, res, next) => {
    const { error } = message_1.sendMessageSchema.validate(req.body);
    if (error) {
        return (0, response_1.errorResponse)(res, 400, `${error.message}`);
    }
    return next();
};
exports.validateOnSend = validateOnSend;
