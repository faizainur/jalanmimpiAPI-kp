import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error_handler";
import { DonationController } from "../controller/donation_controller";
import { DonationItemStatus } from "../enums/donation_status";
import { stat } from "fs";
import { AuthController } from "../controller/auth_controller";
import { RequestAuth } from "../interfaces/request_auth.interface";
import { DonationItem } from "../models/donation";
import { FundDetails } from "../models/fund_details";
import validator from "validator";
import { parse } from "path";

export const router = express.Router();

const donationController = new DonationController();
const authController = new AuthController();

var getEnumKeyByValue = (value: string): DonationItemStatus => {
  var status: DonationItemStatus;

  switch (value as string) {
    case "Ongoing":
      status = DonationItemStatus.Ongoing;
      break;
    case "Closed":
      status = DonationItemStatus.Closed;
      break;
    case "Completed":
      status = DonationItemStatus.Completed;
      break;
    case "Rejected":
      status = DonationItemStatus.Rejected;
      break;
    case "Pending":
      status = DonationItemStatus.Pending;
      break;
    default:
      status = DonationItemStatus.Ongoing;
      break;
  }

  return status;
};

router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  // res.send(typeof req.query.limit !== "string" ? "test" : "lol");
  donationController
    .getAllDonations(
      typeof req.query.limit === "undefined"
        ? 10
        : parseInt(req.query.limit as string),
      typeof req.query.offset === "undefined"
        ? 0
        : parseInt(req.query.offset as string),
      typeof req.body.status === "undefined"
        ? DonationItemStatus.Ongoing
        : getEnumKeyByValue(req.query.status as string)
    )
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});

router.get("/details", (req: Request, res: Response, next: NextFunction) => {
  donationController
    .getDonationById(req.query.donationId as string)
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});

router.get(
  "/details/totalEarned",
  (req: Request, res: Response, next: NextFunction) => {
    donationController
      .getTotalEarnedByDonationId(req.query.donationId as string)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        var errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.get("/search", (req: Request, res: Response, next: NextFunction) => {
  donationController
    .searchDonationItem(
      typeof req.query.limit === "undefined"
        ? 10
        : parseInt(req.query.limit as string),
      typeof req.query.offset === "undefined"
        ? 0
        : parseInt(req.query.offset as string),
      typeof req.query.query === "undefined" ? "" : (req.query.query as string),
      typeof req.query.status === "undefined"
        ? DonationItemStatus.Ongoing
        : getEnumKeyByValue(req.query.status as string)
    )
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});

router.get(
  "/details/fund",
  (req: Request, res: Response, next: NextFunction) => {
    donationController
      .getFundDetailsByDonationId(req.query.donationId as string)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.get(
  "/details/donors",
  (req: Request, res: Response, next: NextFunction) => {
    donationController
      .getDonorsByDonationid(
        req.query.donationId as string,
        typeof req.body.limit === "undefined"
          ? 10
          : parseInt(req.query.limit as string),
        typeof req.body.offset === "undefined"
          ? 0
          : parseInt(req.query.offset as string)
      )
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.post(
  "/create",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    // var uid = req.body.uid; // development
    var uid = req.uid as string;

    var donationItem = new DonationItem(
      uid,
      req.body.title,
      req.body.description,
      parseInt(req.body.totalNominal),
      req.body.imageUrl,
      req.body.expiredDate
    );

    donationController
      .createDonationItem(donationItem)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.put(
  "/update",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    // var uid = req.body.uid; // development
    var uid = req.uid as string;

    var donationItem = new DonationItem(
      uid,
      req.body.title,
      req.body.description,
      parseInt(req.body.totalNominal),
      req.body.imageUrl,
      req.body.expiredDate,
      req.body.donationId
    );

    donationController
      .updateDonationItem(donationItem)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.post(
  "/insert/fund",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    var fundDetails: Array<FundDetails> = [];

    req.body.fundDetails.forEach((element: any) => {
      fundDetails.push(
        new FundDetails(
          req.body.donationId,
          element.itemDetail,
          element.nominalDetail,
          element.description
        )
      );
    });

    if (fundDetails.length > 0) {
      donationController
        .insertFundDetailsBulk(fundDetails)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
          const errorMessage = errorHandler(error);
          res.status(errorMessage.httpStatusCode).send(errorMessage);
        });
    } else {
      res.status(400).json({ code: "400", message: "Check your input" });
    }
  }
);

router.put(
  "/update/fund",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    var fundDetails = new FundDetails(
      req.body.donationId,
      req.body.itemDetail,
      req.body.nominalDetail,
      req.body.description,
      req.body.fundDetailsId
    );
    donationController
      .updateFundDetailsSingle(fundDetails)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.put(
  "/:donationId/completed",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    // var uid = req.query.uid; // development
    var uid = req.uid as string;
    donationController
      .updateDonationStatus(
        uid,
        req.params.donationId,
        getEnumKeyByValue("Completed")
      )
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.put(
  "/:donationId/close",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    // var uid = req.query.uid; // development
    var uid = req.uid as string;
    donationController
      .updateDonationStatus(
        uid,
        req.params.donationId,
        getEnumKeyByValue("Closed")
      )
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.put(
  "/:donationId/resume",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    // var uid = req.query.uid; // development
    var uid = req.uid as string;
    donationController
      .updateDonationStatus(
        uid,
        req.params.donationId,
        getEnumKeyByValue("Ongoing")
      )
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);

router.put(
  "/:donationId/reject",
  authController.verifyAuthToken,
  (req: RequestAuth, res: Response, next: NextFunction) => {
    // var uid = req.query.uid; // development
    var uid = req.uid as string;
    donationController
      .updateDonationStatus(
        uid,
        req.params.donationId,
        getEnumKeyByValue("Rejected")
      )
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);
