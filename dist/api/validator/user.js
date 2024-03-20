"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = exports.userSigninValidator = void 0;
const user_validation_schema_1 = require("../utilis/user.validation.schema");
const response_1 = require("../helpers/response");
const userSigninValidator = (req, res, next) => {
    const { error } = user_validation_schema_1.userSchema.validate(req.body);
    if (error) {
        return (0, response_1.errorResponse)(res, 400, `${error.message}`);
    }
    return next();
};
exports.userSigninValidator = userSigninValidator;
const userValidator = (req, res, next) => {
    const { error } = user_validation_schema_1.userSigninSchema.validate(req.body);
    if (error) {
        return (0, response_1.errorResponse)(res, 400, `${error.message}`);
    }
    return next();
};
exports.userValidator = userValidator;
