CREATE TABLE "asset" (
	"id" text PRIMARY KEY NOT NULL,
	"symbol" text NOT NULL,
	"asset_type" text NOT NULL,
	"base_currency" text,
	"quote_currency" text
);
--> statement-breakpoint
CREATE TABLE "ohlcv" (
	"asset_id" text NOT NULL,
	"open" double precision NOT NULL,
	"high" double precision NOT NULL,
	"low" double precision NOT NULL,
	"close" double precision NOT NULL,
	"volume" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"cash_balance" double precision NOT NULL,
	"base_currency" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_asset" (
	"portofolio_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"asset_id" text NOT NULL,
	"quantity" double precision NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "portfolio_user_id_name_index" ON "portfolio" USING btree ("user_id","name");