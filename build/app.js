"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cron_1 = __importDefault(require("cron"));
// Routers
const index_1 = require("./routes/index");
const users_1 = require("./routes/users");
const account_1 = require("./routes/account");
const donation_1 = require("./routes/donation");
const payment_1 = require("./routes/payment");
const donation_controller_1 = require("./controller/donation_controller");
exports.app = express_1.default();
const CronJob = cron_1.default.CronJob;
// Initialized required middlewares
exports.app.use(cors_1.default());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(morgan_1.default("dev"));
exports.app.use(cookie_parser_1.default());
const ROOT_ENDPOINT = "/v1";
// Initliaze routes middlewares
exports.app.use(ROOT_ENDPOINT, index_1.router);
exports.app.use(ROOT_ENDPOINT + "/users", users_1.router);
exports.app.use(ROOT_ENDPOINT + "/account", account_1.router);
exports.app.use(ROOT_ENDPOINT + "/donation", donation_1.router);
exports.app.use(ROOT_ENDPOINT + "/payment", payment_1.router);
// Initialize cron job
// Check expired donation at 00.05 everyday
const job = new CronJob("5 0 * * * *", // CRON string
() => {
    new donation_controller_1.DonationController()
        .setExpiredDonation()
        .then((data) => console.log(data
        ? "Success update expired data"
        : "No expired donation items"));
}, () => {
    console.log("task completed");
});
// Start cron job
job.start();
console.log("CronJob started");
