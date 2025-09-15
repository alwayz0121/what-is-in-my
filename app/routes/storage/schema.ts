import {
    pgTable,
    uuid,
    text,
    timestamp,
    integer,
    boolean,
    index,
    } from "drizzle-orm/pg-core";
import { profiles } from "../profile/schema";

export const storages = pgTable(
    "storages",
    {
      id: uuid("id").primaryKey().defaultRandom().notNull(),
      user_id: uuid("user_id")
        .notNull()
        .references(() => profiles.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      type: text("type").default("DRAWER").notNull(),
  
      // 대시보드 표시용 필드들
      item_count: integer("item_count").default(0).notNull(), // items 테이블에서 storage_id가 일치하는 개수
      section_count: integer("section_count").default(0).notNull(), // sections 테이블에서 storage_id가 일치하는 개수
      expiring_count: integer("expiring_count").default(0).notNull(),
      last_updated: timestamp("last_updated", { withTimezone: true }),
      image: text("image"), // 이미지 URL 또는 경로

      // 메타데이터
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
      type_idx: index("storages_type_idx").on(t.type),
    }),
  );

// 섹션 테이블 (저장소 내의 구역)
export const sections = pgTable(
  "sections",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    storage_id: uuid("storage_id")
      .notNull()
      .references(() => storages.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    
    // 메타데이터
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    by_storage_idx: index("sections_storage_idx").on(t.storage_id),
    storage_name_idx: index("sections_storage_name_idx").on(t.storage_id, t.name),
  }),
);