"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.succesResponse = exports.errorResponse = void 0;
const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};
exports.errorResponse = errorResponse;
const succesResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({ message, data });
};
exports.succesResponse = succesResponse;
