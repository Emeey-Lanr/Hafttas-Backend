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
