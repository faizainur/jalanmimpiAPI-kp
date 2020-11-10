import express, { NextFunction, Request, Response } from "express";
import { admin } from "../utils/firebase_utils";
import { errorHandler } from "../utils/error_handler";
import {
  sendEmailResetPassword,
  sendEmailVerification,
} from "../utils/send_email_utils";
import { UserController } from "../controller/users_controller";
import validator from "validator";
import { reject } from "bluebird";
import { Address } from "../models/address";
import { User } from "../models/user";
import { Gender } from "../enums/gender";
import { AuthController } from "../controller/auth_controller";
import { RequestAuth } from "../interfaces/request_auth.interface";
import { auth } from "firebase-admin";
import { BankAccount } from "../models/bank_account";

export const router = express.Router();

const userController = new UserController();
const authController = new AuthController();

// TEst API
router.get(
  "/",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    // var uid: string = req.query.uid as string;
    var uid = req.uid as string;
    userController
      .getAccountInfo(uid)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.post(
  "/register",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    userController
      .createUser(req.uid as string)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.get(
  "/profile",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    userController
      .getUserProfileByUid(req.uid as string)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.post(
  "/profile",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    // var uid = req.body.uid;
    var uid = req.uid as string;

    var address = new Address(
      uid,
      req.body.addressLine1,
      req.body.addressLine2,
      req.body.city,
      req.body.province,
      req.body.country,
      req.body.postalCode
    );

    var user = new User(
      uid,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      validator.equals(req.body.gender, "Male") ? Gender.Male : Gender.Female,
      req.body.profession,
      req.body.phoneNumber,
      req.body.photoUrl,
      req.body.idCardUrl,
      address
    );
    userController
      .recordUserProfile(user)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.put(
  "/profile",
  authController.verifyAuthToken,
  async (req: RequestAuth, res: Response, next: NextFunction) => {
    try {
      var uid = req.uid as string; // production
      // var uid = req.body.uid;
      var address = new Address(
        uid,
        req.body.addressLine1,
        req.body.addressLine2,
        req.body.city,
        req.body.province,
        req.body.country,
        req.body.postalCode
      );

      var user = new User(
        uid,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        validator.equals(req.body.gender, "Male") ? Gender.Male : Gender.Female,
        req.body.profession,
        req.body.phoneNumber,
        req.body.photoUrl,
        req.body.idCardUrl,
        address
      );

      // req.email == old email before update, retrived from firebase
      // When local testing, PLEASE change this value.
      // Otherwise, you will gonna get a headache.
      // I've spent 3 HOURS debugging, only to found out i forgot to change this value.
      // PLEASE
      var userProfile = await userController.updateUserProfile(
        req.email as string,
        user
      );

      // Change email in firebase
      if (!validator.equals(req.email as string, req.body.email)) {
        await admin
          .auth()
          .updateUser(uid, { email: req.body.email, emailVerified: false });
      }

      res.status(200).send(userProfile);
    } catch (error) {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
  }
);

router.get(
  "/email/verify",
  authController.verifyAuthToken,
  async (req: RequestAuth, res: Response, next: NextFunction) => {
    try {
      var redirectUrl =
        "https://api-jalanmimpi.herokuapp.com/v1/account/email/verify/" +
        req.uid;
      const actionCodeSettings = {
        url: redirectUrl,
        handleCodeInApp: false,
      };

      var link = await admin
        .auth()
        .generateEmailVerificationLink(req.email as string, actionCodeSettings);

      var info = await sendEmailVerification(req.email as string, link);

      res.status(200).send(info);
      // if (validator.equals(req.query.type, 'email')) {

      // }
    } catch (error) {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
  }
);

router.put(
  "/email/verify/:userUid",
  (req: RequestAuth, res: Response, next: NextFunction) => {
    userController
      .updateEmailVerified(req.params.userUid, true)
      .then(() => res.status(200).send("Your e-mail is verified"))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.get(
  "/resetPassword",
  async (req: RequestAuth, res: Response, next: NextFunction) => {
    try {
      const actionCodeSettings = {
        url: "https://test-jalanmimpi-app.firebaseapp.com/login",
        handleCodeInApp: false,
      };

      var link = await admin
        .auth()
        .generatePasswordResetLink(
          req.query.email as string,
          actionCodeSettings
        );

      var info = await sendEmailResetPassword(req.query.email as string, link);

      res.status(200).send(info);
    } catch (error) {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    }
  }
);

// router.get('/changePassword', (req, res, next) => {
//     admin.auth()
//         .updateUser(uid, { password: req.body.password })
//         .then((data) => res.status(200).json({
//             code: "200",
//             message: "Password changed succesfully"
//         }))
//         .catch((error) => res.send(error))
// })

router.get(
  "/bank-account",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    userController
      .getUserBankAccountInfo(req.uid as string)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.post(
  "/bank-account/register",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    var userBankAccount = new BankAccount(
      req.uid as string,
      req.body.bankName,
      req.body.accountNumber,
      req.body.description
    );
    userController
      .registerBankAccount(userBankAccount)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.put(
  "/bank-account",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    var userBankAccount = new BankAccount(
      req.uid as string,
      req.body.bankName,
      req.body.accountNumber,
      req.body.description,
      req.body.bankAccounId
    );

    userController
      .updateBankAccountByUid(userBankAccount)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);
