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
exports.AuthController = void 0;
const error_handler_1 = require("../utils/error_handler");
const firebase_utils_1 = require("../utils/firebase_utils");
class AuthController {
    constructor() {
        this.getAuthToken = (req, res, next) => {
            if (req.headers.authorization &&
                req.headers.authorization.split(" ")[0] === "Bearer") {
                req.authToken = req.headers.authorization.split(" ")[1];
            }
            else {
                req.authToken = null;
            }
            next();
        };
        this.verifyAuthToken = (req, res, next) => {
            this.getAuthToken(req, res, () => __awaiter(this, void 0, void 0, function* () {
                const { authToken } = req;
                if (authToken !== null && typeof authToken !== undefined) {
                    firebase_utils_1.admin
                        .auth()
                        .verifyIdToken(authToken)
                        .then((decodedToken) => {
                        req.uid = decodedToken.uid;
                        req.email = decodedToken.email;
                        next();
                    })
                        .catch((error) => {
                        const errorMessage = error_handler_1.errorHandler(401);
                        res.status(errorMessage.httpStatusCode).json(errorMessage);
                    });
                }
                else {
                    const errorMessage = error_handler_1.errorHandler(4010);
                    res.status(errorMessage.httpStatusCode).json(errorMessage);
                }
            }));
        };
    }
}
exports.AuthController = AuthController;
