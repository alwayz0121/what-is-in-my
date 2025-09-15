CREATE TABLE "sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storage_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sections" ADD CONSTRAINT "sections_storage_id_storages_id_fk" FOREIGN KEY ("storage_id") REFERENCES "public"."storages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "sections_storage_idx" ON "sections" USING btree ("storage_id");--> statement-breakpoint
CREATE INDEX "sections_storage_name_idx" ON "sections" USING btree ("storage_id","name");--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE set null ON UPDATE no action;