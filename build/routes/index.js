"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
exports.router = express_1.default.Router();
/* GET home page. */
exports.router.get("/", (req, res, next) => {
    // var don = new DonationItem("1", "23", "ada", "adad", 1312, "adadad");
    res.status(200).json({
        status: "Connected",
        message: "Jalan Mimpi API",
    });
});
