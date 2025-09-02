import {
    pgTable,
    uuid,
    text,
    timestamp,
    integer,
    pgEnum,
    boolean,
    index,
    } from "drizzle-orm/pg-core";
import { STORAGE_TYPES } from "./constants";

// ---------- Enums ----------
export const storageTypeEnum = pgEnum("storage_type", STORAGE_TYPES);

export const storages = pgTable(
    "storages",
    {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    user_id: uuid("user_id").notNull(), 
    name: text("name").notNull(),
    type: storageTypeEnum("type").default("DRAWER").notNull(),
    room: text("room"), // e.g., "거실", "안방", "주방"
    color_hex: text("color_hex"), // UI tint per storage
    
    
    // Photo metadata for click-map
    photo_url: text("photo_url"),
    image_width: integer("image_width"),
    image_height: integer("image_height"),
    
    
    is_archived: boolean("is_archived").default(false).notNull(),
    
    
    created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
    },
    (t) => ({
    by_user_iIdx: index("storages_user_idx").on(t.user_id),
    userNameIdx: index("storages_user_name_idx").on(t.user_id, t.name),
    }),
    );