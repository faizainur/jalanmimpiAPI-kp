import request from "supertest";
import { app } from "../src/app";
import {
  bankAccountRegister,
  bankAccountUpdate,
  createPayment,
  donationRegister,
  donationUpdate,
  fundDetailsRegister,
  fundDetailsUpdate,
  userProfileRegister,
  userProfileUpdate,
} from "./utils/constants";

jest.setTimeout(30000);

describe("Test Jalan Mimpi API", () => {
  describe("Test API root path", () => {
    test("It should respond with an json object", async () => {
      try {
        return request(app)
          .get("/v1")
          .expect(200)
          .expect("Access-Control-Allow-Origin", "*")
          .then((response) => console.log(response.body));
      } catch (error) {}
    });
  });

  describe("Test Account API, These APIs are need an authorization", () => {
    test("Register Account", () => {
      return request(app)
        .post("/v1/account/register")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get user account info", () => {
      return request(app)
        .get("/v1/account/")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Record profile of a registered user account.", () => {
      return request(app)
        .post("/v1/account/profile")
        .type("application/json")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .send(userProfileRegister)
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get user profile", () => {
      return request(app)
        .get("/v1/account/profile")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Update existing user profile", () => {
      return request(app)
        .put("/v1/account/profile")
        .type("application/json")
        .send(userProfileUpdate)
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Register user bank account", () => {
      return request(app)
        .post("/v1/account/bank-account/register")
        .type("application/json")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .send(bankAccountRegister)
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200)
        .then((response) => {
          bankAccountUpdate.bankAccountId = response.body.id;
        });
    });

    test("Update registed bank account", () => {
      return request(app)
        .put("/v1/account/bank-account")
        .type("application/json")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .send(bankAccountUpdate)
        .expect(200);
    });

    test("Get user bank account info", () => {
      return request(app)
        .get("/v1/account/bank-account")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Request email verification", () => {
      return request(app)
        .get("/v1/account/email/verify")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Request email reset password", () => {
      return request(app)
        .get("/v1/account/resetPassword")
        .expect("Access-Control-Allow-Origin", "*")
        .query({ email: "fs.rofiq@gmail.com" })
        .expect(200)
        .catch((error) => console.log(error.body));
    });
  });

  describe("Test Users API", () => {
    test("Get All User Profile, should return list of user profiles", () => {
      return request(app)
        .get("/v1/users")
        .then((response) => {
          expect(response.status).toBe(200);
          expect(typeof response.body).toBe("object");
        });
    });

    test("Get user profile by user UID", () => {
      return request(app)
        .get("/v1/users/profile/k9I2TOeqMhZxMvTN9xreI6Jr8an1")
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.uid).toBe("k9I2TOeqMhZxMvTN9xreI6Jr8an1");
        });
    });
  });

  describe("Test Donation API", () => {
    test("Get list of all registered donations, with query strings", () => {
      return request(app)
        .get("/v1/donation/list")
        .query({ limit: 10 })
        .query({ offset: 0 })
        .query({ status: "Ongoing" })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get list of all registered donations without query strings", () => {
      return request(app)
        .get("/v1/donation/list")
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Create donation", () => {
      return request(app)
        .post("/v1/donation/create")
        .type("application/json")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .send(donationRegister)
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200)
        .then((response) => {
          donationUpdate.donationId = response.body.donation_id;
          fundDetailsRegister.donationId = response.body.donation_id;
          fundDetailsUpdate.donationId = response.body.donation_id;
        });
    });

    test("Insert fund details", () => {
      return request(app)
        .post("/v1/donation/insert/fund")
        .type("application/json")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .send(fundDetailsRegister)
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200)
        .then((response) => {
          fundDetailsUpdate.fundDetailsId = response.body[0].id;
        });
    });

    test("Update donation item", () => {
      return request(app)
        .put("/v1/donation/update")
        .type("application/json")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .send(donationUpdate)
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Update fund details", () => {
      return request(app)
        .put("/v1/donation/update/fund")
        .type("application/json")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .send(fundDetailsUpdate)
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get donation details by ID", () => {
      return request(app)
        .get("/v1/donation/details")
        .query({ donationId: fundDetailsRegister.donationId })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get fund details by donation id", () => {
      return request(app)
        .get("/v1/donation/details/fund")
        .query({ donationId: fundDetailsRegister.donationId })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get donors list of a donation item with limit and offset", () => {
      return request(app)
        .get("/v1/donation/details/donors")
        .query({ donationId: fundDetailsRegister.donationId })
        .query({ limit: 10 })
        .query({ offset: 0 })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get donors list of a donation item without limit and offset", () => {
      return request(app)
        .get("/v1/donation/details/donors")
        .query({ donationId: fundDetailsRegister.donationId })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Search donation with status, limit and offset", () => {
      return request(app)
        .get("/v1/donation/search")
        .query({ query: "Skripsi" })
        .query({ status: "Ongoing" })
        .query({ limit: 10 })
        .query({ offset: 0 })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Search donation without status, limit and offset", () => {
      return request(app)
        .get("/v1/donation/search")
        .query({ query: "skripsi" })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get total earned of a donation", () => {
      return request(app)
        .get("/v1/donation/details/totalEarned")
        .query({ donationId: "DN-1pk3ku3VpXwsI1Ku5q7ktt8tH" })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Change status of a donation item to COMPLETED", () => {
      return request(app)
        .put(`/v1/donation/${fundDetailsRegister.donationId}/completed`)
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Change status of a donation item to CLOSED", () => {
      return request(app)
        .put(`/v1/donation/${fundDetailsRegister.donationId}/close`)
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Change status of a donation item to REJECTED", () => {
      return request(app)
        .put(`/v1/donation/${fundDetailsRegister.donationId}/reject`)
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Change status of a CLOSED donation item to ONGOING", () => {
      return request(app)
        .put(`/v1/donation/${fundDetailsRegister.donationId}/resume`)
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });
  });

  describe("Test Payment API", () => {
    var transactionId: string = "";

    test("Create new payment", () => {
      return request(app)
        .post("/v1/payment")
        .type("application/json")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .send(createPayment)
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200)
        .then((response) => {
          transactionId = response.body.transaction_id;
        });
    });

    test("Get payment info", () => {
      return request(app)
        .get("/v1/payment")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .query({ transactionId: transactionId })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get payment status", () => {
      return request(app)
        .get("/v1/payment/status")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .query({ transactionId: transactionId })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get list of transactions by User UID", () => {
      return request(app)
        .get("/v1/payment/list/user")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });

    test("Get list of transactions by Donation ID", () => {
      return request(app)
        .get("/v1/payment/list/donation")
        .set(
          "authorization",
          `Bearer ${process.env.FIREBASE_TOKEN_TEST as string}`
        )
        .query({ donationId: createPayment.donationId })
        .expect("Access-Control-Allow-Origin", "*")
        .expect(200);
    });
  });
});
