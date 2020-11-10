import express, { NextFunction, Request, Response } from "express";
import { admin } from "../utils/firebase_utils";
import { errorHandler } from "../utils/error_handler";
import { core, snap } from "../utils/midtrans_utils";
import { customAlphabet } from "nanoid";
import { UserController } from "../controller/users_controller";
import { TransactionController } from "../controller/transaction_controller";
import { parse, stringify } from "flatted";
import { getTransactionStatusSql } from "../utils/sqls/transaction_queries";
import { AuthController } from "../controller/auth_controller";
import { RequestAuth } from "../interfaces/request_auth.interface";
import { Transaction } from "../models/transaction";
import { TransactionStatus } from "../enums/transaction_status";
import validator from "validator";

export const router = express.Router();

const transactionController = new TransactionController();
const userController = new UserController();
const authController = new AuthController();

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  27
);

router.get(
  "/list/donation",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    transactionController
      .getTransactionsByDonationId(req.query.donationId as string)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.get(
  "/list/user",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    transactionController
      .getTransactionsByUserUid(req.uid as string)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.get(
  "/",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    transactionController
      .getTransactionById(req.query.transactionId as string)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.get(
  "/status",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    transactionController
      .getTransactionStatus(req.query.transactionId as string)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.post(
  "/",
  authController.verifyAuthToken,
  async (req: RequestAuth, res: Response, next: NextFunction) => {
    try {
      var uid = req.uid as string;
      // var uid = req.body.uid;

      var transactionId = "TR-" + nanoid();

      var transactionItem = new Transaction(
        transactionId,
        uid,
        req.body.donationId,
        req.body.nominal,
        req.body.description
      );

      var customer: any = await userController.getUserProfileByUid(uid);

      let parameter = {
        transaction_details: {
          order_id: transactionItem.getId(),
          gross_amount: transactionItem.getNominal(),
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: customer.first_name as string,
          last_name: customer.last_name as string,
          email: customer.email as string,
          phone: customer.phone_number as string,
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

      var paymentInfo = await snap.createTransaction(parameter);

      var transaction: any = await transactionController.createTransaction(
        transactionItem
      );

      transaction.payment_data = paymentInfo;

      res.status(200).send(transaction);
    } catch (error) {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
  }
);

// Only for local testing not for production
router.post("/update", (req: Request, res: Response, next: NextFunction) => {
  transactionController
    .updateTransactionStatus(
      req.query.id as string,
      getEnumKeyByValue("Success")
    )
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});

var getEnumKeyByValue = (value: string): TransactionStatus => {
  var status: TransactionStatus;

  switch (value as string) {
    case "Challenge":
      status = TransactionStatus.Challange;
      break;
    case "Failed":
      status = TransactionStatus.Failed;
      break;
    case "Pending":
      status = TransactionStatus.Pending;
      break;
    case "Refund":
      status = TransactionStatus.Refund;
      break;
    case "Success":
      status = TransactionStatus.Success;
      break;
    default:
      status = TransactionStatus.Pending;
      break;
  }

  return status;
};

router.post(
  "/notification",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      var receivedJson = req.body;

      var transactionStatusObject = await core.transaction.notification(
        receivedJson
      );

      let transactionId = transactionStatusObject.order_id;
      let transactionStatus = transactionStatusObject.transaction_status;
      let fraudStatus = transactionStatusObject.fraud_status;

      let summary = `Transaction notification received. Order ID: ${transactionId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}.<br>Raw notification object:<pre>${JSON.stringify(
        transactionStatusObject,
        null,
        2
      )}</pre>`;

      if (validator.equals(transactionStatus, "capture")) {
        if (validator.equals(fraudStatus, "challenge")) {
          var transaction = await transactionController.updateTransactionStatus(
            transactionId,
            getEnumKeyByValue("Challenge")
          );
        } else if (validator.equals(fraudStatus, "accept")) {
          // TODO set transaction status on your databaase to 'success'
          var transaction = await transactionController.updateTransactionStatus(
            transactionId,
            getEnumKeyByValue("Success")
          );
        }
      } else if (validator.equals(transactionStatus, "settlement")) {
        // TODO set transaction status on your databaase to 'success'
        var transaction = await transactionController.updateTransactionStatus(
          transactionId,
          getEnumKeyByValue("Success")
        );
      } else if (
        validator.equals(transactionStatus, "cancel") ||
        validator.equals(transactionStatus, "deny") ||
        validator.equals(transactionStatus, "expire")
      ) {
        // TODO set transaction status on your databaase to 'failure'
        var transaction = await transactionController.updateTransactionStatus(
          transactionId,
          getEnumKeyByValue("Failed")
        );
      } else if (validator.equals(transactionStatus, "pending")) {
        // TODO set transaction status on your databaase to 'pending' / waiting payment
        var transaction = await transactionController.updateTransactionStatus(
          transactionId,
          getEnumKeyByValue("Pending")
        );
      } else if (validator.equals(transactionStatus, "refund")) {
        // TODO set transaction status on your databaase to 'refund'
        var transaction = await transactionController.updateTransactionStatus(
          transactionId,
          getEnumKeyByValue("Refund")
        );
      }
      console.log(summary);
      res.status(200).send(summary);
    } catch (error) {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
  }
);

// module.exports = router;
