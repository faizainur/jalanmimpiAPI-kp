CREATE TYPE "gender" AS ENUM (
  'Male',
  'Female'
);

CREATE TYPE "payout_status" AS ENUM (
  'Waiting',
  'Approved',
  'Rejected'
);

CREATE TYPE "transaction_status" AS ENUM (
  'Challenge',
  'Pending',
  'Success',
  'Failed',
  'Refund'
);

CREATE TYPE "donation_item_status" AS ENUM (
  'Completed',
  'Ongoing',
  'Closed',
  'Rejected',
  'Pending'
);

CREATE TABLE "users" (
  "id" SERIAL,
  "uid" varchar UNIQUE PRIMARY KEY NOT NULL,
  "join_date" timestamp with time zone DEFAULT (CURRENT_TIMESTAMP),
  "email_verified" boolean DEFAULT (false),
  "profile_is_filled" boolean DEFAULT (false)
);

CREATE TABLE "user_profiles" (
  "id" SERIAL PRIMARY KEY,
  "uid" varchar UNIQUE,
  "first_name" text,
  "last_name" text,
  "email" text UNIQUE NOT NULL,
  "gender" gender,
  "profession" text,
  "phone_number" text,
  "photo_url" text,
  "id_card_url" text
);

CREATE TABLE "countries" (
  "id" SERIAL PRIMARY KEY,
  "country" text UNIQUE NOT NULL
);

CREATE TABLE "provinces" (
  "id" SERIAL PRIMARY KEY,
  "province" text NOT NULL,
  "country_id" int
);

CREATE TABLE "cities" (
  "id" SERIAL PRIMARY KEY,
  "city" text NOT NULL,
  "province_id" int,
  "country_id" int
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "uid" varchar UNIQUE,
  "address_line_1" text,
  "address_line_2" text,
  "city_id" int,
  "province_id" int,
  "country_id" int,
  "postal_code" int
);

CREATE TABLE "donation_items" (
  "id" SERIAL,
  "donation_id" varchar UNIQUE PRIMARY KEY NOT NULL,
  "uid" varchar,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "target_nominal" int NOT NULL,
  "created_date" timestamp with time zone NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "img_url" text,
  "status" donation_item_status NOT NULL DEFAULT ('Ongoing')
);

CREATE TABLE "fund_details" (
  "id" SERIAL PRIMARY KEY,
  "donation_id" varchar,
  "item_detail" text NOT NULL,
  "nominal_detail" int NOT NULL,
  "description" text
);

CREATE TABLE "donors" (
  "id" SERIAL PRIMARY KEY,
  "donation_id" varchar,
  "uid" varchar UNIQUE
);

CREATE TABLE "bank_accounts" (
  "id" SERIAL PRIMARY KEY,
  "uid" varchar,
  "bank_name" text NOT NULL,
  "account_number" int UNIQUE NOT NULL,
  "description" text,
  "created_date" timestamp with time zone NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "transactions" (
  "id" SERIAL,
  "transaction_id" varchar UNIQUE PRIMARY KEY NOT NULL,
  "uid" varchar,
  "donation_id" varchar,
  "nominal" int NOT NULL,
  "status" transaction_status NOT NULL DEFAULT ('Pending'),
  "date" timestamp with time zone NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "description" text
);

CREATE TABLE "disbursement" (
  "id" SERIAL PRIMARY KEY,
  "disbursement_id" varchar UNIQUE NOT NULL,
  "mt_reference_no" varchar NOT NULL UNIQUE,
  "donation_id" varchar,
  "date" timestamp with time zone DEFAULT (CURRENT_TIMESTAMP),
  "bank_account_id" int,
  "nominal" int NOT NULL,
  "status" payout_status NOT NULL DEFAULT ('Waiting'),
  "description" text
);

CREATE TABLE "payouts" (
  "id" SERIAL PRIMARY KEY,
  "reference_no" varchar NOT NULL UNIQUE,
  "status" payout_status NOT NULL,
  "timestamp" timestamp with time zone DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE "user_profiles" ADD FOREIGN KEY ("uid") REFERENCES "users" ("uid");

ALTER TABLE "provinces" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("id");

ALTER TABLE "cities" ADD FOREIGN KEY ("province_id") REFERENCES "provinces" ("id");

ALTER TABLE "cities" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("uid") REFERENCES "users" ("uid");

ALTER TABLE "addresses" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("province_id") REFERENCES "provinces" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("id");

ALTER TABLE "donation_items" ADD FOREIGN KEY ("uid") REFERENCES "users" ("uid");

ALTER TABLE "fund_details" ADD FOREIGN KEY ("donation_id") REFERENCES "donation_items" ("donation_id");

ALTER TABLE "donors" ADD FOREIGN KEY ("donation_id") REFERENCES "donation_items" ("donation_id");

ALTER TABLE "donors" ADD FOREIGN KEY ("uid") REFERENCES "users" ("uid");

ALTER TABLE "bank_accounts" ADD FOREIGN KEY ("uid") REFERENCES "users" ("uid");

ALTER TABLE "transactions" ADD FOREIGN KEY ("uid") REFERENCES "users" ("uid");

ALTER TABLE "transactions" ADD FOREIGN KEY ("donation_id") REFERENCES "donation_items" ("donation_id");

ALTER TABLE "disbursement" ADD FOREIGN KEY ("mt_reference_no") REFERENCES "payouts" ("reference_no");

ALTER TABLE "disbursement" ADD FOREIGN KEY ("donation_id") REFERENCES "donation_items" ("donation_id");

ALTER TABLE "disbursement" ADD FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts" ("id");
