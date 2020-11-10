"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
require("dotenv/config");
var options = {
    promiseLib: bluebird_1.default,
};
var connection = {
    host: process.env.DATABASE_URL,
    port: process.env.POSTGRES_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    // ssl:
    ssl: {
        rejectUnauthorized: false,
    },
};
const pgp = require("pg-promise")(options);
exports.db = pgp(connection);
