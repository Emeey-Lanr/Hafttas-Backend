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
exports.ProducerS = void 0;
const search_1 = require("../helpers/search");
const token_1 = require("../helpers/token");
const message_1 = require("../models/message");
class ProducerS {
    static createMessageBox(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // search if user exist
                const ifUserExist = yield (0, search_1.userSearch)({ username: data.username });
                if (!ifUserExist.status) {
                    return new Error("User validation error, try again");
                }
                // search if title already exist
                const ifTitleExist = yield (0, search_1.messageSearch)({ title: data.title });
                if (ifTitleExist.status) {
                    return new Error("Title already exist");
                }
                // creaet a new message box
                const link = (0, token_1.generateLink)(data.username);
                const messageData = Object.assign(Object.assign({}, data), { link });
                console.log(messageData);
                const createNewMessage = new message_1.messageModel(data);
                const saveToDb = yield createNewMessage.save();
                return saveToDb;
            }
            catch (error) {
                return new Error(`${error.message}`);
            }
        });
    }
}
exports.ProducerS = ProducerS;
