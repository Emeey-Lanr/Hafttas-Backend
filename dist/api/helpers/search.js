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
exports.messageSearch = exports.userSearch = void 0;
const user_model_1 = require("../models/user.model");
const message_1 = require("../models/message");
const userSearch = (searchData) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.userModel.findOne(searchData);
    let existInfo = { data: exist, status: true };
    if (exist) {
        return existInfo;
    }
    existInfo.status = false;
    return existInfo;
});
exports.userSearch = userSearch;
const messageSearch = (searchData) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield message_1.messageModel.findOne(searchData);
    let existInfo = {
        data: exist,
        status: true,
    };
    if (exist) {
        return existInfo;
    }
    existInfo.status = false;
    return existInfo;
});
exports.messageSearch = messageSearch;
