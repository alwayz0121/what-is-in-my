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
import { profiles } from "../profile/schema";

// ---------- Enums ----------
export const storageTypeEnum = pgEnum("storage_type", STORAGE_TYPES);

export const storages = pgTable(
    "storages",
    {
      id: uuid("id").primaryKey().defaultRandom().notNull(),
      user_id: uuid("user_id")
        .notNull()
        .references(() => profiles.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      type: storageTypeEnum("type").default("DRAWER").notNull(),
  
      room: text("room"), // 거실, 주방, 안방 등
      color_hex: text("color_hex"), // UI 색상 테마
  
      // 사진 기반 클릭맵 확장
      photo_url: text("photo_url"),
      image_width: integer("image_width"),
      image_height: integer("image_height"),
  
      // 상태 관리
      is_archived: boolean("is_archived").default(false).notNull(),

      created_at: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
      updated_at: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    },
    (t) => ({
      by_user_idx: index("storages_user_idx").on(t.user_id),
      user_name_idx: index("storages_user_name_idx").on(t.user_id, t.name),
    }),
  );