"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const users_controller_1 = require("../controller/users_controller");
const error_handler_1 = require("../utils/error_handler");
exports.router = express_1.default.Router();
const userController = new users_controller_1.UserController();
exports.router.get("/", (req, res, next) => {
    userController
        .getAllUserProfiles()
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.post("/", (req, res, next) => {
    userController
        .createUser(req.query.uid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/profile/:userUid", (req, res, next) => {
    userController
        .getUserProfilePublicByUid(req.params.userUid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
