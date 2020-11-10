import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cron from "cron";

// Routers
import { router as indexRouter } from "./routes/index";
import { router as usersRouter } from "./routes/users";
import { router as accountRouter } from "./routes/account";
import { router as donationRouter } from "./routes/donation";
import { router as paymentRouter } from "./routes/payment";
import { DonationController } from "./controller/donation_controller";

export const app = express();

const CronJob = cron.CronJob;

// Initialized required middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

const ROOT_ENDPOINT = "/v1";

// Initliaze routes middlewares
app.use(ROOT_ENDPOINT, indexRouter);
app.use(ROOT_ENDPOINT + "/users", usersRouter);
app.use(ROOT_ENDPOINT + "/account", accountRouter);
app.use(ROOT_ENDPOINT + "/donation", donationRouter);
app.use(ROOT_ENDPOINT + "/payment", paymentRouter);

// Initialize cron job
// Check expired donation at 00.05 everyday
const job = new CronJob(
  "5 0 * * * *", // CRON string
  () => {
    new DonationController()
      .setExpiredDonation()
      .then((data: any) =>
        console.log(
          (data as boolean)
            ? "Success update expired data"
            : "No expired donation items"
        )
      );
  },
  () => {
    console.log("task completed" as string);
  }
);

// Start cron job
job.start();
console.log("CronJob started");
