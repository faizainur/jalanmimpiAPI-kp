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
exports.sendEmailResetPassword = exports.sendEmailVerification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const transporter = nodemailer_1.default.createTransport({
    port: 465,
    host: "mail.jalanmimpi.id",
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASS,
    },
    secure: true,
});
exports.sendEmailVerification = (to, link) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mailData = {
                from: process.env.EMAIL_SENDER,
                to: to,
                subject: "Email Verification",
                text: "Verify your email address: " + link,
            };
            var info = yield transporter.sendMail(mailData);
            resolve(info);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.sendEmailResetPassword = (to, link) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mailData = {
                from: process.env.EMAIL_SENDER,
                to: to,
                subject: "Reset Password",
                text: "Reset your password using the given link: " + link,
            };
            var info = yield transporter.sendMail(mailData);
            resolve(info);
        }
        catch (error) {
            reject(error);
        }
    }));
};
