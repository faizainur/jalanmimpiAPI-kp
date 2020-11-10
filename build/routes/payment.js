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
const error_handler_1 = require("../utils/error_handler");
const midtrans_utils_1 = require("../utils/midtrans_utils");
const nanoid_1 = require("nanoid");
const users_controller_1 = require("../controller/users_controller");
const transaction_controller_1 = require("../controller/transaction_controller");
const auth_controller_1 = require("../controller/auth_controller");
const transaction_1 = require("../models/transaction");
const transaction_status_1 = require("../enums/transaction_status");
const validator_1 = __importDefault(require("validator"));
exports.router = express_1.default.Router();
const transactionController = new transaction_controller_1.TransactionController();
const userController = new users_controller_1.UserController();
const authController = new auth_controller_1.AuthController();
const nanoid = nanoid_1.customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 27);
exports.router.get("/list/donation", authController.verifyAuthToken, (req, res, next) => {
    transactionController
        .getTransactionsByDonationId(req.query.donationId)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/list/user", authController.verifyAuthToken, (req, res, next) => {
    transactionController
        .getTransactionsByUserUid(req.uid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/", authController.verifyAuthToken, (req, res, next) => {
    transactionController
        .getTransactionById(req.query.transactionId)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/status", authController.verifyAuthToken, (req, res, next) => {
    transactionController
        .getTransactionStatus(req.query.transactionId)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.post("/", authController.verifyAuthToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var uid = req.uid;
        // var uid = req.body.uid;
        var transactionId = "TR-" + nanoid();
        var transactionItem = new transaction_1.Transaction(transactionId, uid, req.body.donationId, req.body.nominal, req.body.description);
        var customer = yield userController.getUserProfileByUid(uid);
        let parameter = {
            transaction_details: {
                order_id: transactionItem.getId(),
                gross_amount: transactionItem.getNominal(),
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: customer.first_name,
                last_name: customer.last_name,
                email: customer.email,
                phone: customer.phone_number,
            },
            enabled_payments: [
                "credit_card",
                "cimb_clicks",
                "bca_klikbca",
                "bca_klikpay",
                "bri_epay",
                "echannel",
                "permata_va",
                "bca_va",
                "bni_va",
                "bri_va",
                "other_va",
                "gopay",
                "indomaret",
                "danamon_online",
                "akulaku",
                "shopeepay",
            ],
        };
        var paymentInfo = yield midtrans_utils_1.snap.createTransaction(parameter);
        var transaction = yield transactionController.createTransaction(transactionItem);
        transaction.payment_data = paymentInfo;
        res.status(200).send(transaction);
    }
    catch (error) {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
}));
// Only for local testing not for production
exports.router.post("/update", (req, res, next) => {
    transactionController
        .updateTransactionStatus(req.query.id, getEnumKeyByValue("Success"))
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
var getEnumKeyByValue = (value) => {
    var status;
    switch (value) {
        case "Challenge":
            status = transaction_status_1.TransactionStatus.Challange;
            break;
        case "Failed":
            status = transaction_status_1.TransactionStatus.Failed;
            break;
        case "Pending":
            status = transaction_status_1.TransactionStatus.Pending;
            break;
        case "Refund":
            status = transaction_status_1.TransactionStatus.Refund;
            break;
        case "Success":
            status = transaction_status_1.TransactionStatus.Success;
            break;
        default:
            status = transaction_status_1.TransactionStatus.Pending;
            break;
    }
    return status;
};
exports.router.post("/notification", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var receivedJson = req.body;
        var transactionStatusObject = yield midtrans_utils_1.core.transaction.notification(receivedJson);
        let transactionId = transactionStatusObject.order_id;
        let transactionStatus = transactionStatusObject.transaction_status;
        let fraudStatus = transactionStatusObject.fraud_status;
        let summary = `Transaction notification received. Order ID: ${transactionId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}.<br>Raw notification object:<pre>${JSON.stringify(transactionStatusObject, null, 2)}</pre>`;
        if (validator_1.default.equals(transactionStatus, "capture")) {
            if (validator_1.default.equals(fraudStatus, "challenge")) {
                var transaction = yield transactionController.updateTransactionStatus(transactionId, getEnumKeyByValue("Challenge"));
            }
            else if (validator_1.default.equals(fraudStatus, "accept")) {
                // TODO set transaction status on your databaase to 'success'
                var transaction = yield transactionController.updateTransactionStatus(transactionId, getEnumKeyByValue("Success"));
            }
        }
        else if (validator_1.default.equals(transactionStatus, "settlement")) {
            // TODO set transaction status on your databaase to 'success'
            var transaction = yield transactionController.updateTransactionStatus(transactionId, getEnumKeyByValue("Success"));
        }
        else if (validator_1.default.equals(transactionStatus, "cancel") ||
            validator_1.default.equals(transactionStatus, "deny") ||
            validator_1.default.equals(transactionStatus, "expire")) {
            // TODO set transaction status on your databaase to 'failure'
            var transaction = yield transactionController.updateTransactionStatus(transactionId, getEnumKeyByValue("Failed"));
        }
        else if (validator_1.default.equals(transactionStatus, "pending")) {
            // TODO set transaction status on your databaase to 'pending' / waiting payment
            var transaction = yield transactionController.updateTransactionStatus(transactionId, getEnumKeyByValue("Pending"));
        }
        else if (validator_1.default.equals(transactionStatus, "refund")) {
            // TODO set transaction status on your databaase to 'refund'
            var transaction = yield transactionController.updateTransactionStatus(transactionId, getEnumKeyByValue("Refund"));
        }
        console.log(summary);
        res.status(200).send(summary);
    }
    catch (error) {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
}));
// module.exports = router;
