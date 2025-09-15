import {
    pgTable,
    uuid,
    text,
    timestamp,
    integer,
    boolean,
    index,
    varchar,
    date,
  } from "drizzle-orm/pg-core";
import { storages, sections } from "~/routes/storage/schema";

export const items = pgTable(
    "items",
    {
      id: uuid("id").primaryKey().defaultRandom().notNull(),
      storage_id: uuid("storage_id")
        .notNull()
        .references(() => storages.id, { onDelete: "cascade" }),
      
      // 기본 정보
      name: text("name").notNull(),
      description: text("description"),
      category: varchar("category", { length: 50 }),
      
      // 수량 및 단위
      quantity: integer("quantity").default(1).notNull(),
      unit: varchar("unit", { length: 20 }).default("개"),
      
      // 날짜 정보
      expiry_date: date("expiry_date"), // 유통기한 (YYYY-MM-DD 형식)
      added_date: date("added_date"), // 추가일
      
      // 위치 정보
      section_id: uuid("section_id")
        .references(() => sections.id, { onDelete: "set null" }), // 섹션 ID (선택사항)
      section_name: varchar("section_name", { length: 100 }), // 섹션 이름 (캐시용)
      
      // 상태 관리
      is_consumed: boolean("is_consumed").default(false).notNull(),
      is_expired: boolean("is_expired").default(false).notNull(),
      
      // 메타데이터
      created_at: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
      updated_at: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    },
    (t) => ({
      by_storage_idx: index("items_storage_idx").on(t.storage_id),
      name_idx: index("items_name_idx").on(t.name),
      category_idx: index("items_category_idx").on(t.category),
      expiry_date_idx: index("items_expiry_date_idx").on(t.expiry_date),
      section_idx: index("items_section_idx").on(t.section_id),
      consumed_idx: index("items_consumed_idx").on(t.is_consumed),
    }),
  );

// 아이템 히스토리 테이블
export const itemHistory = pgTable(
    "item_history",
    {
      id: uuid("id").primaryKey().defaultRandom().notNull(),
      item_id: uuid("item_id")
        .notNull()
        .references(() => items.id, { onDelete: "cascade" }),
      
      action: varchar("action", { length: 50 }).notNull(), // "추가", "수량 변경", "삭제" 등
      details: text("details"), // 상세 정보
      action_date: date("action_date").notNull(), // 액션 발생일
      
      created_at: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    },
    (t) => ({
      by_item_idx: index("item_history_item_idx").on(t.item_id),
      action_date_idx: index("item_history_action_date_idx").on(t.action_date),
    }),
  );