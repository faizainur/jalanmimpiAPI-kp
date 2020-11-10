import { db } from "../utils/db_utils";
import "dotenv/config";
import {
  getAllDonationSql,
  getDonationByIdSql,
  getDonorsByDonationIdSql,
  getFundDetailsByDonationIdSql,
  searchDonationItemSql,
} from "../utils/sqls/donation_queries";
import {
  updateDonationStatusSql,
  insertDonationItemSql,
  insertFundDetailsSql,
  updateDonationItemSql,
  updateFundDetailSql,
  updateExpiredDateSql,
  setExpiredDonationSql,
} from "../utils/sqls/donation_mutation";
import { customAlphabet } from "nanoid";
import { DonationItem } from "../models/donation";
import { FundDetails } from "../models/fund_details";
import { DonationItemStatus } from "../enums/donation_status";
import { getTotalEarnedByDonationIdSql } from "../utils/sqls/transaction_queries";
import { reject } from "bluebird";

export class DonationController {
  nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    25
  );

  constructor() {}

  getAllDonations = (
    limit: number = 10,
    offset: number = 0,
    status: DonationItemStatus = DonationItemStatus.Ongoing
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = db.manyOrNone(getAllDonationSql, [status, limit, offset]);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  getDonationById = (donationId: string) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone(getDonationByIdSql, [donationId])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  // BUGSSS
  searchDonationItem = (
    limit: number = 10,
    offset: number = 0,
    searchQuery: string = "",
    status: DonationItemStatus = DonationItemStatus.Ongoing
  ) => {
    return new Promise((resolve, reject) => {
      db.manyOrNone(searchDonationItemSql, [
        "%" + searchQuery + "%",
        status,
        limit,
        offset,
      ])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  getFundDetailsByDonationId = (donationId: string, t: any = db) => {
    return new Promise((resolve, reject) => {
      t.manyOrNone(getFundDetailsByDonationIdSql, [donationId])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  getDonorsByDonationid = (
    donationId: string,
    limit: number = 30,
    offset: number = 0
  ) => {
    return new Promise((resolve, reject) => {
      db.manyOrNone(getDonorsByDonationIdSql, [donationId, limit, offset])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  createDonationItem = (donationItem: DonationItem) => {
    return new Promise((resolve, reject) => {
      // Generate Donation ID
      var donationId = "DN-" + this.nanoid();

      // Insert donation item to database
      db.oneOrNone(insertDonationItemSql, [
        donationId,
        donationItem.getUid(),
        donationItem.getTitle(),
        donationItem.getDescription(),
        donationItem.getTotalNominal(),
        donationItem.getImageUrl(),
        donationItem.getExpiredDate(),
      ])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  updateDonationItem = (donationItem: DonationItem) => {
    return new Promise((resolve, reject) => {
      // Update donation item in database
      db.oneOrNone(updateDonationItemSql, [
        donationItem.getTitle(),
        donationItem.getDescription(),
        donationItem.getTotalNominal(),
        donationItem.getImageUrl(),
        donationItem.getExpiredDate(),
        donationItem.getId(),
        donationItem.getUid(),
      ])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  // fundDetails is an array of fund details
  insertFundDetailsBulk = (fundDetails: Array<FundDetails>) => {
    return new Promise(async (resolve, reject) => {
      db.task(async (t: any) => {
        try {
          fundDetails.forEach(async (element) => {
            await t.oneOrNone(insertFundDetailsSql, [
              element.getDonationId(),
              element.getItemDetail(),
              element.getNominalDetail(),
              element.getDescription(),
            ]);
          });
          return await this.getFundDetailsByDonationId(
            fundDetails[0].getDonationId(),
            t
          );
        } catch (error) {
          reject(error);
        }
      })
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  // fundDetails is an object containing the details of an item
  insertFundDetailsSingle = (fundDetails: FundDetails) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone(insertFundDetailsSql, [
        fundDetails.getDonationId(),
        fundDetails.getItemDetail(),
        fundDetails.getNominalDetail(),
        fundDetails.getDescription(),
      ])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  // fundDetails is an object containing the details of an item
  updateFundDetailsSingle = (fundDetails: FundDetails) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone(updateFundDetailSql, [
        fundDetails.getItemDetail(),
        fundDetails.getNominalDetail(),
        fundDetails.getDescription(),
        fundDetails.getId(),
        fundDetails.getDonationId(),
      ])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  // TODO Change status donation
  updateDonationStatus = (
    uid: string,
    donationId: string,
    status: DonationItemStatus,
    t: any = db
  ) => {
    return new Promise((resolve, reject) => {
      t.oneOrNone(updateDonationStatusSql, [status, donationId, uid])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  getTotalEarnedByDonationId = (donationId: string) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone(getTotalEarnedByDonationIdSql, [donationId])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  updateExpiredDate = (donationId: string, expiredDate: string) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone(updateExpiredDateSql, [expiredDate, donationId])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  setExpiredDonation = () => {
    return new Promise((resolve, reject) => {
      db.manyOrNone(setExpiredDonationSql)
        .then((data: any) => (data.length > 0 ? resolve(true) : resolve(false)))
        .catch((error: any) => reject(error));
    });
  };
}
