import promise from "bluebird";
import "dotenv/config";

var options = {
  promiseLib: promise,
};

var connection = {
  host: process.env.DATABASE_URL,
  port: process.env.POSTGRES_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  // ssl:
  ssl: {
    rejectUnauthorized: false,
  },
};

const pgp = require("pg-promise")(options);
export const db = pgp(connection);
