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
exports.usernameOrEmail = void 0;
const usernameOrEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // every email comes with an @
    // we check if the data contains it 
    // when splited it turn to an array with the length of 2
    // if not the array length will be 1 when can then use that to determine if it's a username or an email
    const array = data.split('@');
    let type = '';
    if (array.length > 1) {
        type = 'email';
    }
    else {
        type = 'username';
    }
    return type;
});
exports.usernameOrEmail = usernameOrEmail;
