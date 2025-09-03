import {
    pgTable,
    uuid,
    text,
    timestamp,
    integer,
    boolean,
    index,
  } from "drizzle-orm/pg-core";
import { storages } from "~/routes/storage/schema";

export const items = pgTable(
    "items",
    {
      id: uuid("id").primaryKey().defaultRandom().notNull(),
      storage_id: uuid("storage_id")
        .notNull()
        .references(() => storages.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      quantity: integer("quantity").default(1).notNull(),
      expiration_date: timestamp("expiration_date", { withTimezone: true }),
  
      // 상태 관리
      is_consumed: boolean("is_consumed").default(false).notNull(),
  
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
    }),
  );