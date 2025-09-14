ALTER TABLE "storages" ADD COLUMN "item_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "storages" ADD COLUMN "expiring_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "storages" ADD COLUMN "last_updated" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "storages" ADD COLUMN "image" text;--> statement-breakpoint
CREATE INDEX "storages_type_idx" ON "storages" USING btree ("type");--> statement-breakpoint
ALTER TABLE "storages" DROP COLUMN "room";--> statement-breakpoint
ALTER TABLE "storages" DROP COLUMN "color_hex";--> statement-breakpoint
ALTER TABLE "storages" DROP COLUMN "photo_url";--> statement-breakpoint
ALTER TABLE "storages" DROP COLUMN "image_width";--> statement-breakpoint
ALTER TABLE "storages" DROP COLUMN "image_height";--> statement-breakpoint
ALTER TABLE "storages" DROP COLUMN "is_archived";