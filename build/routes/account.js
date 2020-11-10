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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const firebase_utils_1 = require("../utils/firebase_utils");
const error_handler_1 = require("../utils/error_handler");
const send_email_utils_1 = require("../utils/send_email_utils");
const users_controller_1 = require("../controller/users_controller");
const validator_1 = __importDefault(require("validator"));
const address_1 = require("../models/address");
const user_1 = require("../models/user");
const gender_1 = require("../enums/gender");
const auth_controller_1 = require("../controller/auth_controller");
const bank_account_1 = require("../models/bank_account");
exports.router = express_1.default.Router();
const userController = new users_controller_1.UserController();
const authController = new auth_controller_1.AuthController();
// TEst API
exports.router.get("/", authController.verifyAuthToken, (req, res, next) => {
    // var uid: string = req.query.uid as string;
    var uid = req.uid;
    userController
        .getAccountInfo(uid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.post("/register", authController.verifyAuthToken, (req, res, next) => {
    userController
        .createUser(req.uid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/profile", authController.verifyAuthToken, (req, res, next) => {
    userController
        .getUserProfileByUid(req.uid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.post("/profile", authController.verifyAuthToken, (req, res, next) => {
    // var uid = req.body.uid;
    var uid = req.uid;
    var address = new address_1.Address(uid, req.body.addressLine1, req.body.addressLine2, req.body.city, req.body.province, req.body.country, req.body.postalCode);
    var user = new user_1.User(uid, req.body.firstName, req.body.lastName, req.body.email, validator_1.default.equals(req.body.gender, "Male") ? gender_1.Gender.Male : gender_1.Gender.Female, req.body.profession, req.body.phoneNumber, req.body.photoUrl, req.body.idCardUrl, address);
    userController
        .recordUserProfile(user)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.put("/profile", authController.verifyAuthToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var uid = req.uid; // production
        // var uid = req.body.uid;
        var address = new address_1.Address(uid, req.body.addressLine1, req.body.addressLine2, req.body.city, req.body.province, req.body.country, req.body.postalCode);
        var user = new user_1.User(uid, req.body.firstName, req.body.lastName, req.body.email, validator_1.default.equals(req.body.gender, "Male") ? gender_1.Gender.Male : gender_1.Gender.Female, req.body.profession, req.body.phoneNumber, req.body.photoUrl, req.body.idCardUrl, address);
        // req.email == old email before update, retrived from firebase
        // When local testing, PLEASE change this value.
        // Otherwise, you will gonna get a headache.
        // I've spent 3 HOURS debugging, only to found out i forgot to change this value.
        // PLEASE
        var userProfile = yield userController.updateUserProfile(req.email, user);
        // Change email in firebase
        if (!validator_1.default.equals(req.email, req.body.email)) {
            yield firebase_utils_1.admin
                .auth()
                .updateUser(uid, { email: req.body.email, emailVerified: false });
        }
        res.status(200).send(userProfile);
    }
    catch (error) {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
}));
exports.router.get("/email/verify", authController.verifyAuthToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var redirectUrl = "https://api-jalanmimpi.herokuapp.com/v1/account/email/verify/" +
            req.uid;
        const actionCodeSettings = {
            url: redirectUrl,
            handleCodeInApp: false,
        };
        var link = yield firebase_utils_1.admin
            .auth()
            .generateEmailVerificationLink(req.email, actionCodeSettings);
        var info = yield send_email_utils_1.sendEmailVerification(req.email, link);
        res.status(200).send(info);
        // if (validator.equals(req.query.type, 'email')) {
        // }
    }
    catch (error) {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
}));
exports.router.put("/email/verify/:userUid", (req, res, next) => {
    userController
        .updateEmailVerified(req.params.userUid, true)
        .then(() => res.status(200).send("Your e-mail is verified"))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/resetPassword", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actionCodeSettings = {
            url: "https://test-jalanmimpi-app.firebaseapp.com/login",
            handleCodeInApp: false,
        };
        var link = yield firebase_utils_1.admin
            .auth()
            .generatePasswordResetLink(req.query.email, actionCodeSettings);
        var info = yield send_email_utils_1.sendEmailResetPassword(req.query.email, link);
        res.status(200).send(info);
    }
    catch (error) {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
}));
// router.get('/changePassword', (req, res, next) => {
//     admin.auth()
//         .updateUser(uid, { password: req.body.password })
//         .then((data) => res.status(200).json({
//             code: "200",
//             message: "Password changed succesfully"
//         }))
//         .catch((error) => res.send(error))
// })
exports.router.get("/bank-account", authController.verifyAuthToken, (req, res, next) => {
    userController
        .getUserBankAccountInfo(req.uid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.post("/bank-account/register", authController.verifyAuthToken, (req, res, next) => {
    var userBankAccount = new bank_account_1.BankAccount(req.uid, req.body.bankName, req.body.accountNumber, req.body.description);
    userController
        .registerBankAccount(userBankAccount)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.put("/bank-account", authController.verifyAuthToken, (req, res, next) => {
    var userBankAccount = new bank_account_1.BankAccount(req.uid, req.body.bankName, req.body.accountNumber, req.body.description, req.body.bankAccounId);
    userController
        .updateBankAccountByUid(userBankAccount)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
