"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const db_utils_1 = require("../utils/db_utils");
const transaction_queries_1 = require("../utils/sqls/transaction_queries");
const transaction_mutation_1 = require("../utils/sqls/transaction_mutation");
class TransactionController {
    constructor() {
        this.getTransactionsByDonationId = (donationId) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.manyOrNone(transaction_queries_1.getTransactionsByDonationIdSql, [donationId])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.getTransactionsByUserUid = (uid) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.manyOrNone(transaction_queries_1.getTransactionsByUserUidSql, [uid])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.getTransactionById = (transactionId) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.oneOrNone(transaction_queries_1.getTransactionByIdSql, [transactionId])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.getTransactionStatus = (transactionId) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.oneOrNone(transaction_queries_1.getTransactionStatusSql, [transactionId])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.createTransaction = (transaction) => {
            return new Promise((resolve, reject) => {
                // console.log(transaction.transactionId)
                // resolve(transaction)
                db_utils_1.db.oneOrNone(transaction_mutation_1.createTransactionSql, [
                    transaction.getId(),
                    transaction.getUid(),
                    transaction.getDonationId(),
                    transaction.getNominal(),
                    transaction.getDescription(),
                ])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.updateTransactionStatus = (transactionId, status) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.oneOrNone(transaction_mutation_1.updateTransactionStatusSql, [status, transactionId])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
    }
}
exports.TransactionController = TransactionController;
