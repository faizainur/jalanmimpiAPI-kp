"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("../utils/error_handler");
const donation_controller_1 = require("../controller/donation_controller");
const donation_status_1 = require("../enums/donation_status");
const auth_controller_1 = require("../controller/auth_controller");
const donation_1 = require("../models/donation");
const fund_details_1 = require("../models/fund_details");
exports.router = express_1.default.Router();
const donationController = new donation_controller_1.DonationController();
const authController = new auth_controller_1.AuthController();
var getEnumKeyByValue = (value) => {
    var status;
    switch (value) {
        case "Ongoing":
            status = donation_status_1.DonationItemStatus.Ongoing;
            break;
        case "Closed":
            status = donation_status_1.DonationItemStatus.Closed;
            break;
        case "Completed":
            status = donation_status_1.DonationItemStatus.Completed;
            break;
        case "Rejected":
            status = donation_status_1.DonationItemStatus.Rejected;
            break;
        case "Pending":
            status = donation_status_1.DonationItemStatus.Pending;
            break;
        default:
            status = donation_status_1.DonationItemStatus.Ongoing;
            break;
    }
    return status;
};
exports.router.get("/list", (req, res, next) => {
    // res.send(typeof req.query.limit !== "string" ? "test" : "lol");
    donationController
        .getAllDonations(typeof req.query.limit === "undefined"
        ? 10
        : parseInt(req.query.limit), typeof req.query.offset === "undefined"
        ? 0
        : parseInt(req.query.offset), typeof req.body.status === "undefined"
        ? donation_status_1.DonationItemStatus.Ongoing
        : getEnumKeyByValue(req.query.status))
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/details", (req, res, next) => {
    donationController
        .getDonationById(req.query.donationId)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/details/totalEarned", (req, res, next) => {
    donationController
        .getTotalEarnedByDonationId(req.query.donationId)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        var errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/search", (req, res, next) => {
    donationController
        .searchDonationItem(typeof req.query.limit === "undefined"
        ? 10
        : parseInt(req.query.limit), typeof req.query.offset === "undefined"
        ? 0
        : parseInt(req.query.offset), typeof req.query.query === "undefined" ? "" : req.query.query, typeof req.query.status === "undefined"
        ? donation_status_1.DonationItemStatus.Ongoing
        : getEnumKeyByValue(req.query.status))
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/details/fund", (req, res, next) => {
    donationController
        .getFundDetailsByDonationId(req.query.donationId)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.get("/details/donors", (req, res, next) => {
    donationController
        .getDonorsByDonationid(req.query.donationId, typeof req.body.limit === "undefined"
        ? 10
        : parseInt(req.query.limit), typeof req.body.offset === "undefined"
        ? 0
        : parseInt(req.query.offset))
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.post("/create", authController.verifyAuthToken, (req, res, next) => {
    // var uid = req.body.uid; // development
    var uid = req.uid;
    var donationItem = new donation_1.DonationItem(uid, req.body.title, req.body.description, parseInt(req.body.totalNominal), req.body.imageUrl, req.body.expiredDate);
    donationController
        .createDonationItem(donationItem)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.put("/update", authController.verifyAuthToken, (req, res, next) => {
    // var uid = req.body.uid; // development
    var uid = req.uid;
    var donationItem = new donation_1.DonationItem(uid, req.body.title, req.body.description, parseInt(req.body.totalNominal), req.body.imageUrl, req.body.expiredDate, req.body.donationId);
    donationController
        .updateDonationItem(donationItem)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.post("/insert/fund", authController.verifyAuthToken, (req, res, next) => {
    var fundDetails = [];
    req.body.fundDetails.forEach((element) => {
        fundDetails.push(new fund_details_1.FundDetails(req.body.donationId, element.itemDetail, element.nominalDetail, element.description));
    });
    if (fundDetails.length > 0) {
        donationController
            .insertFundDetailsBulk(fundDetails)
            .then((data) => res.status(200).send(data))
            .catch((error) => {
            const errorMessage = error_handler_1.errorHandler(error);
            res.status(errorMessage.httpStatusCode).send(errorMessage);
        });
    }
    else {
        res.status(400).json({ code: "400", message: "Check your input" });
    }
});
exports.router.put("/update/fund", authController.verifyAuthToken, (req, res, next) => {
    var fundDetails = new fund_details_1.FundDetails(req.body.donationId, req.body.itemDetail, req.body.nominalDetail, req.body.description, req.body.fundDetailsId);
    donationController
        .updateFundDetailsSingle(fundDetails)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.put("/:donationId/completed", authController.verifyAuthToken, (req, res, next) => {
    // var uid = req.query.uid; // development
    var uid = req.uid;
    donationController
        .updateDonationStatus(uid, req.params.donationId, getEnumKeyByValue("Completed"))
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.put("/:donationId/close", authController.verifyAuthToken, (req, res, next) => {
    // var uid = req.query.uid; // development
    var uid = req.uid;
    donationController
        .updateDonationStatus(uid, req.params.donationId, getEnumKeyByValue("Closed"))
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.put("/:donationId/resume", authController.verifyAuthToken, (req, res, next) => {
    // var uid = req.query.uid; // development
    var uid = req.uid;
    donationController
        .updateDonationStatus(uid, req.params.donationId, getEnumKeyByValue("Ongoing"))
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
exports.router.put("/:donationId/reject", authController.verifyAuthToken, (req, res, next) => {
    // var uid = req.query.uid; // development
    var uid = req.uid;
    donationController
        .updateDonationStatus(uid, req.params.donationId, getEnumKeyByValue("Rejected"))
        .then((data) => res.status(200).send(data))
        .catch((error) => {
        const errorMessage = error_handler_1.errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});
