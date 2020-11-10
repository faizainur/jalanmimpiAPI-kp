"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.admin = firebase_admin_1.default;
// Private key for firebase Admin
const serviceAccount = require("../../misc/serviceAccountKey.json");
try {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
        databaseURL: "https://test-jalanmimpi-app.firebaseio.com",
    });
    console.log("Connected to firebase");
}
catch (error) {
    console.log(error);
}
