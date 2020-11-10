import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { UserController } from "../controller/users_controller";
import { errorHandler } from "../utils/error_handler";

export const router = express.Router();

const userController = new UserController();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  userController
    .getAllUserProfiles()
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  userController
    .createUser(req.query.uid as string)
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      const errorMessage = errorHandler(error);
      res.status(errorMessage.httpStatusCode).send(errorMessage);
    });
});

router.get(
  "/profile/:userUid",
  (req: Request, res: Response, next: NextFunction) => {
    userController
      .getUserProfilePublicByUid(req.params.userUid)
      .then((data) => res.status(200).send(data))
      .catch((error) => {
        const errorMessage = errorHandler(error);
        res.status(errorMessage.httpStatusCode).send(errorMessage);
      });
  }
);
