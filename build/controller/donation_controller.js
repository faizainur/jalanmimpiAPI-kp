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
exports.DonationController = void 0;
const db_utils_1 = require("../utils/db_utils");
require("dotenv/config");
const donation_queries_1 = require("../utils/sqls/donation_queries");
const donation_mutation_1 = require("../utils/sqls/donation_mutation");
const nanoid_1 = require("nanoid");
const donation_status_1 = require("../enums/donation_status");
const transaction_queries_1 = require("../utils/sqls/transaction_queries");
class DonationController {
    constructor() {
        this.nanoid = nanoid_1.customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 25);
        this.getAllDonations = (limit = 10, offset = 0, status = donation_status_1.DonationItemStatus.Ongoing) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = db_utils_1.db.manyOrNone(donation_queries_1.getAllDonationSql, [status, limit, offset]);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.getDonationById = (donationId) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.oneOrNone(donation_queries_1.getDonationByIdSql, [donationId])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        // BUGSSS
        this.searchDonationItem = (limit = 10, offset = 0, searchQuery = "", status = donation_status_1.DonationItemStatus.Ongoing) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.manyOrNone(donation_queries_1.searchDonationItemSql, [
                    "%" + searchQuery + "%",
                    status,
                    limit,
                    offset,
                ])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.getFundDetailsByDonationId = (donationId, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => {
                t.manyOrNone(donation_queries_1.getFundDetailsByDonationIdSql, [donationId])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.getDonorsByDonationid = (donationId, limit = 30, offset = 0) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.manyOrNone(donation_queries_1.getDonorsByDonationIdSql, [donationId, limit, offset])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.createDonationItem = (donationItem) => {
            return new Promise((resolve, reject) => {
                // Generate Donation ID
                var donationId = "DN-" + this.nanoid();
                // Insert donation item to database
                db_utils_1.db.oneOrNone(donation_mutation_1.insertDonationItemSql, [
                    donationId,
                    donationItem.getUid(),
                    donationItem.getTitle(),
                    donationItem.getDescription(),
                    donationItem.getTotalNominal(),
                    donationItem.getImageUrl(),
                    donationItem.getExpiredDate(),
                ])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.updateDonationItem = (donationItem) => {
            return new Promise((resolve, reject) => {
                // Update donation item in database
                db_utils_1.db.oneOrNone(donation_mutation_1.updateDonationItemSql, [
                    donationItem.getTitle(),
                    donationItem.getDescription(),
                    donationItem.getTotalNominal(),
                    donationItem.getImageUrl(),
                    donationItem.getExpiredDate(),
                    donationItem.getId(),
                    donationItem.getUid(),
                ])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        // fundDetails is an array of fund details
        this.insertFundDetailsBulk = (fundDetails) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                db_utils_1.db.task((t) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        fundDetails.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            yield t.oneOrNone(donation_mutation_1.insertFundDetailsSql, [
                                element.getDonationId(),
                                element.getItemDetail(),
                                element.getNominalDetail(),
                                element.getDescription(),
                            ]);
                        }));
                        return yield this.getFundDetailsByDonationId(fundDetails[0].getDonationId(), t);
                    }
                    catch (error) {
                        reject(error);
                    }
                }))
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            }));
        };
        // fundDetails is an object containing the details of an item
        this.insertFundDetailsSingle = (fundDetails) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.oneOrNone(donation_mutation_1.insertFundDetailsSql, [
                    fundDetails.getDonationId(),
                    fundDetails.getItemDetail(),
                    fundDetails.getNominalDetail(),
                    fundDetails.getDescription(),
                ])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        // fundDetails is an object containing the details of an item
        this.updateFundDetailsSingle = (fundDetails) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.oneOrNone(donation_mutation_1.updateFundDetailSql, [
                    fundDetails.getItemDetail(),
                    fundDetails.getNominalDetail(),
                    fundDetails.getDescription(),
                    fundDetails.getId(),
                    fundDetails.getDonationId(),
                ])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        // TODO Change status donation
        this.updateDonationStatus = (uid, donationId, status, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => {
                t.oneOrNone(donation_mutation_1.updateDonationStatusSql, [status, donationId, uid])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.getTotalEarnedByDonationId = (donationId) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.oneOrNone(transaction_queries_1.getTotalEarnedByDonationIdSql, [donationId])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.updateExpiredDate = (donationId, expiredDate) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.oneOrNone(donation_mutation_1.updateExpiredDateSql, [expiredDate, donationId])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.setExpiredDonation = () => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.manyOrNone(donation_mutation_1.setExpiredDonationSql)
                    .then((data) => (data.length > 0 ? resolve(true) : resolve(false)))
                    .catch((error) => reject(error));
            });
        };
    }
}
exports.DonationController = DonationController;
