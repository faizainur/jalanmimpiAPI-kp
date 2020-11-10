import { NextFunction, Request, Response } from "express";
import { RequestAuth } from "../interfaces/request_auth.interface";
import { errorHandler } from "../utils/error_handler";
import { admin } from "../utils/firebase_utils";

export class AuthController {
  private getAuthToken = (
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      req.authToken = req.headers.authorization.split(" ")[1];
    } else {
      req.authToken = null;
    }
    next();
  };

  public verifyAuthToken = (
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ) => {
    this.getAuthToken(req, res, async () => {
      const { authToken } = req;
      if (authToken !== null && typeof authToken !== undefined) {
        admin
          .auth()
          .verifyIdToken(authToken as string)
          .then((decodedToken: any) => {
            req.uid = decodedToken.uid;
            req.email = decodedToken.email;
            next();
          })
          .catch((error: any) => {
            const errorMessage = errorHandler(401);
            res.status(errorMessage.httpStatusCode).json(errorMessage);
          });
      } else {
        const errorMessage = errorHandler(4010);
        res.status(errorMessage.httpStatusCode).json(errorMessage);
      }
    });
  };
}
