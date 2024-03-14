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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailTextF = (numberToken, jwtToken) => {
    let text = `<div
      style="
        width: 400px;
        margin: 0 auto;
        background-color: #f9f9fb;
        padding: 20px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div>
        <p style="text-align: center; color: #757575; font-family: cursive;">
         Here this your 4 digit password reset pin
        </p>
        <p style="text-align:center; font-size:32px; font-weight:700; color:black;">
        ${numberToken}
        </p>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 0;
          "
        >
          <button
            style="
              border: none;
              background: #00000;
              border-radius: 10px;
              padding: 15px 60px;
            "
          >
            <a
              href="http://localhost:3000/forgot/password/pin?verification=${jwtToken}"
              style="color: white; text-decoration: none; font-family: cursive;" 
              >Click </a
            >
          </button>
        </div>
      </div>
    </div>`;
    return text;
};
const sendMail = (userEmail, numberToken, jwtToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailInfo = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.APP_EMAIL}`,
                pass: `${process.env.EMAIL_PASS}`,
            }
        });
        const email = emailTextF(numberToken, jwtToken);
        const mailOption = {
            from: '',
            to: `${userEmail}`,
            subject: 'Forgot Password',
            text: '',
            html: `${email}`
        };
        const sendMailF = yield mailInfo.sendMail(mailOption);
    }
    catch (error) {
        return new Error("An error occured sending mail");
    }
});
exports.sendMail = sendMail;
