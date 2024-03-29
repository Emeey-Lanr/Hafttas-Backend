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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_middle_ware_1 = require("./api/middleware/app.middle-ware");
const dotenv_1 = require("./api/middleware/dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
(0, app_middle_ware_1.middleware)(app);
(0, dotenv_1.dotenvF)();
const PORT = process.env.PORT_NUMB;
const URI = process.env.DB_URI;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectDb = yield mongoose_1.default.connect(`${URI}`);
        console.log(`app has connected`);
    }
    catch (error) {
        console.log(error.message);
    }
}));
