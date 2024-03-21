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
                const createNewMessage = new message_1.messageModel(messageData);
                const saveToDb = yield createNewMessage.save();
                return saveToDb;
            }
            catch (error) {
                return new Error(`${error.message}`);
            }
        });
    }
    static getAllAnonymousTitle(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   use the user's signin token to fetch the user's data
                const getUserData = (yield (0, token_1.tokenDataRetrieval)(token));
                //   use the data fetched to find all the anonymous created
                const getAll = yield message_1.messageModel.find({
                    username: getUserData.username,
                });
                //  if it's emepty return an error
                return getAll;
            }
            catch (error) {
                return new Error("An error occured getting list");
            }
        });
    }
    static deleteAnoymous(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, username } = data;
            try {
                //   delete via the params id
                const deleteAnonymousData = yield message_1.messageModel.findOneAndDelete({ _id });
                //   get the remaining data vai the query id
                const findAll = yield message_1.messageModel.find({ username });
                return findAll;
            }
            catch (error) {
                return new Error(`${error.message}`);
            }
        });
    }
    static getSingleAnonymousDetails(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   we use the db id to fech t
                const messageBoxSearch = yield (0, search_1.messageSearch)({ _id });
                if (!messageBoxSearch.status) {
                    return new Error("Unable to fetch data");
                }
                return messageBoxSearch.data;
            }
            catch (error) {
                return new Error("An error occured fetching data");
            }
        });
    }
    static getAnoymousDetailsWhenUAboutToSendAMessage(username, link) {
        return __awaiter(this, void 0, void 0, function* () {
            // This is a get request for getting the details
            // about the link before those using the link send a message
            try {
                const searchUser = yield (0, search_1.userSearch)({ username });
                if (!searchUser.status) {
                    return new Error("Access not available");
                }
                const searchMessageBox = yield (0, search_1.messageSearch)({ link });
                if (!searchMessageBox.status) {
                    return new Error("Acsess not available");
                }
                if (searchUser.data.username !== searchMessageBox.data.username) {
                    return new Error("Invalid Link access");
                }
                return searchMessageBox.data;
            }
            catch (error) {
            }
        });
    }
    static addMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
    }
    static deleteMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
    }
}
exports.ProducerS = ProducerS;
