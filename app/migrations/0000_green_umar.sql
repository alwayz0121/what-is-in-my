CREATE TYPE "public"."storage_type" AS ENUM('FRIDGE', 'FREEZER', 'DRAWER', 'SHELF', 'CABINET', 'OTHER');--> statement-breakpoint
CREATE TABLE "storages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" "storage_type" DEFAULT 'DRAWER' NOT NULL,
	"room" text,
	"color_hex" text,
	"photo_url" text,
	"image_width" integer,
	"image_height" integer,
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "storages_user_idx" ON "storages" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "storages_user_name_idx" ON "storages" USING btree ("user_id","name");