"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.producerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const message_1 = require("../validator/message");
const producer_1 = require("../controllers/producer");
exports.producerRoutes = express_1.default.Router();
exports.producerRoutes.post("/create", message_1.validateOnCreate, producer_1.ProducerC.createMessageBox);
exports.producerRoutes.get("/get/all/anonymous", producer_1.ProducerC.getAllAnonymousTitle);
exports.producerRoutes.delete("/delete/:_id", producer_1.ProducerC.deleteAnoymous);
exports.producerRoutes.get("/fetch/single/anonymous/data", producer_1.ProducerC.getSingleAnonymousDetails);
exports.producerRoutes.get("/fetch/data/on/message", producer_1.ProducerC.getAnoymousDetailsWhenUAboutToSendAMessage);
