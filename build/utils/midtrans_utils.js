"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = exports.snap = void 0;
require("dotenv/config");
// import midtransClient from 'midtrans-client'
var midtransClient = require("midtrans-client");
exports.snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
exports.core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
