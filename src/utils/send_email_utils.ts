import { reject, resolve } from "bluebird";
import nodemailer from "nodemailer";
import "dotenv/config";
import Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "mail.jalanmimpi.id",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
});

export const sendEmailVerification = (to: string, link: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mailData = {
        from: process.env.EMAIL_SENDER,
        to: to,
        subject: "Email Verification",
        text: "Verify your email address: " + link,
      };
      var info: Mail = await transporter.sendMail(mailData);

      resolve(info);
    } catch (error) {
      reject(error);
    }
  });
};

export const sendEmailResetPassword = (to: string, link: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mailData = {
        from: process.env.EMAIL_SENDER,
        to: to,
        subject: "Reset Password",
        text: "Reset your password using the given link: " + link,
      };

      var info: Mail = await transporter.sendMail(mailData);

      resolve(info);
    } catch (error) {
      reject(error);
    }
  });
};
