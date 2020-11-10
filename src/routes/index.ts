import express from "express";
import "dotenv/config";
import { DonationItem } from "../models/donation";

export const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  // var don = new DonationItem("1", "23", "ada", "adad", 1312, "adadad");
  res.status(200).json({
    status: "Connected",
    message: "Jalan Mimpi API",
    // data: don,
  });
});
