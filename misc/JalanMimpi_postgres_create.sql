CREATE TABLE "users" (
	"id" serial NOT NULL UNIQUE,
	"uid" VARCHAR(255) NOT NULL UNIQUE,
	"join_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"profession" TEXT,
	"ktp_img_url" TEXT UNIQUE,
	"gender" VARCHAR(255),
	"address" TEXT,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "bank_accounts" (
	"id" serial NOT NULL UNIQUE,
	"uid" VARCHAR(255) NOT NULL,
	"bank" VARCHAR(255) NOT NULL,
	"account_number" VARCHAR(255) NOT NULL,
	CONSTRAINT "bank_accounts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "donation_items" (
	"id" serial NOT NULL UNIQUE,
	"donation_id" VARCHAR(255) NOT NULL UNIQUE,
	"uid" VARCHAR(255) NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT,
	CONSTRAINT "donation_items_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "fund_details" (
	"id" serial NOT NULL,
	"donation_id" VARCHAR(255) NOT NULL,
	"name" TEXT NOT NULL,
	"fund_detail" integer NOT NULL,
	"description" TEXT,
	CONSTRAINT "fund_details_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "transactions" (
	"id" serial NOT NULL,
	"transaction_id" VARCHAR(255) NOT NULL UNIQUE,
	"uid" VARCHAR(255) NOT NULL,
	"donation_id" VARCHAR(255) NOT NULL,
	"nominal" integer NOT NULL,
	CONSTRAINT "transactions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "donors" (
	"id" serial NOT NULL,
	"donation_id" VARCHAR(255) NOT NULL,
	"uid" VARCHAR(255) NOT NULL,
	CONSTRAINT "donors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_fk0" FOREIGN KEY ("uid") REFERENCES "users"("uid");

ALTER TABLE "donation_items" ADD CONSTRAINT "donation_items_fk0" FOREIGN KEY ("uid") REFERENCES "users"("uid");

ALTER TABLE "fund_details" ADD CONSTRAINT "fund_details_fk0" FOREIGN KEY ("donation_id") REFERENCES "donation_items"("donation_id");

ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("uid") REFERENCES "users"("uid");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk1" FOREIGN KEY ("donation_id") REFERENCES "donation_items"("donation_id");

ALTER TABLE "donors" ADD CONSTRAINT "donors_fk0" FOREIGN KEY ("donation_id") REFERENCES "donation_items"("donation_id");
ALTER TABLE "donors" ADD CONSTRAINT "donors_fk1" FOREIGN KEY ("uid") REFERENCES "users"("uid");

