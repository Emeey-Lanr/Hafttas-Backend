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
exports.ProducerC = void 0;
const producer_1 = require("../services/producer");
const response_1 = require("../helpers/response");
class ProducerC {
    static createMessageBox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const create = yield producer_1.ProducerS.createMessageBox(req.body);
                if (create instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${create.message}`);
                }
                return (0, response_1.succesResponse)(res, 200, "Created succesfully", create);
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 400, `An error occured creating`);
            }
        });
    }
    static getAllAnonymousTitle(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const getAll = yield producer_1.ProducerS.getAllAnonymousTitle(`${token}`);
                if (getAll instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${getAll.message}`);
                }
                return (0, response_1.succesResponse)(res, 200, `${getAll.length < 0 ? 'List is empty' : 'Curated succesfully'}`, getAll);
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 400, `An error occured getting`);
            }
        });
    }
    static deleteAnoymous(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteAnonymousData = yield producer_1.ProducerS.deleteAnoymous({ _id: `${req.params._id}`, username: `${req.query.username}` });
                if (deleteAnonymousData instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${deleteAnonymousData.message}`);
                }
                return (0, response_1.succesResponse)(res, 200, "deleted succesfully", deleteAnonymousData);
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 400, `An error occured deleting`);
            }
        });
    }
    static getSingleAnonymousDetails(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // on the frontend the url/title/dbid
                const dbId = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const getData = yield producer_1.ProducerS.getSingleAnonymousDetails(`${dbId}`);
                if (getData instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${getData.message}`);
                }
                return (0, response_1.succesResponse)(res, 200, "data fetched succesfully", getData);
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 400, `An error occured fetching data`);
            }
        });
    }
    static getAnoymousDetailsWhenUAboutToSendAMessage(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // This is a get request for getting the details
            // about the link before those using the link send a message
            // in the bearer token is should be `bearer {username}<*>{link}`
            try {
                const details = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1].split("<*>");
                console.log(details);
                const getDetails = yield producer_1.ProducerS.getAnoymousDetailsWhenUAboutToSendAMessage(`${details[0]}`, `${details[1]}`);
                if (getDetails instanceof Error) {
                    return (0, response_1.errorResponse)(res, 400, `${getDetails.message}`);
                }
                return (0, response_1.succesResponse)(res, 200, "data fetched succesfully", getDetails);
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 400, `An error occured fetching data`);
            }
        });
    }
    static addMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addMessageInsideBox = yield producer_1.ProducerS.addMessage(req.body);
            }
            catch (error) {
            }
        });
    }
    static deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
    }
}
exports.ProducerC = ProducerC;
