CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"item_id" uuid NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"nickname" text,
	"email" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" text DEFAULT 'kakao' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"item_id" uuid NOT NULL,
	"action" varchar(50) NOT NULL,
	"details" text,
	"action_date" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storage_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"category" varchar(50),
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit" varchar(20) DEFAULT '개',
	"expiry_date" date,
	"added_date" date,
	"section_id" uuid,
	"section_name" varchar(100),
	"is_consumed" boolean DEFAULT false NOT NULL,
	"is_expired" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "storages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" text DEFAULT 'DRAWER' NOT NULL,
	"item_count" integer DEFAULT 0 NOT NULL,
	"expiring_count" integer DEFAULT 0 NOT NULL,
	"last_updated" timestamp with time zone,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_history" ADD CONSTRAINT "item_history_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_storage_id_storages_id_fk" FOREIGN KEY ("storage_id") REFERENCES "public"."storages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "storages" ADD CONSTRAINT "storages_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "notifications_user_idx" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notifications_item_idx" ON "notifications" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX "item_history_item_idx" ON "item_history" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX "item_history_action_date_idx" ON "item_history" USING btree ("action_date");--> statement-breakpoint
CREATE INDEX "items_storage_idx" ON "items" USING btree ("storage_id");--> statement-breakpoint
CREATE INDEX "items_name_idx" ON "items" USING btree ("name");--> statement-breakpoint
CREATE INDEX "items_category_idx" ON "items" USING btree ("category");--> statement-breakpoint
CREATE INDEX "items_expiry_date_idx" ON "items" USING btree ("expiry_date");--> statement-breakpoint
CREATE INDEX "items_section_idx" ON "items" USING btree ("section_id");--> statement-breakpoint
CREATE INDEX "items_consumed_idx" ON "items" USING btree ("is_consumed");--> statement-breakpoint
CREATE INDEX "storages_user_idx" ON "storages" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "storages_user_name_idx" ON "storages" USING btree ("user_id","name");--> statement-breakpoint
CREATE INDEX "storages_type_idx" ON "storages" USING btree ("type");