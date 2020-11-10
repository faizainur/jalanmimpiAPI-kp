import { db } from "../utils/db_utils";
import validator from "validator";
import { reject, resolve } from "bluebird";
import {
  getTransactionByIdSql,
  getTransactionsByDonationIdSql,
  getTransactionsByUserUidSql,
  getTransactionStatusSql,
} from "../utils/sqls/transaction_queries";
import {
  createTransactionSql,
  updateTransactionStatusSql,
} from "../utils/sqls/transaction_mutation";
import { Transaction } from "../models/transaction";
import { TransactionStatus } from "../enums/transaction_status";

export class TransactionController {
  getTransactionsByDonationId = (donationId: string) => {
    return new Promise((resolve, reject) => {
      db.manyOrNone(getTransactionsByDonationIdSql, [donationId])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  getTransactionsByUserUid = (uid: string) => {
    return new Promise((resolve, reject) => {
      db.manyOrNone(getTransactionsByUserUidSql, [uid])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  getTransactionById = (transactionId: string) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone(getTransactionByIdSql, [transactionId])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  getTransactionStatus = (transactionId: string) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone(getTransactionStatusSql, [transactionId])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  createTransaction = (transaction: Transaction) => {
    return new Promise((resolve, reject) => {
      // console.log(transaction.transactionId)
      // resolve(transaction)
      db.oneOrNone(createTransactionSql, [
        transaction.getId(),
        transaction.getUid(),
        transaction.getDonationId(),
        transaction.getNominal(),
        transaction.getDescription(),
      ])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  updateTransactionStatus = (
    transactionId: string,
    status: TransactionStatus
  ) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone(updateTransactionStatusSql, [status, transactionId])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };
}
