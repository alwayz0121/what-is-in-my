import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { profiles } from "../profile/schema";
import { items } from "../storage/[id]/item/[itemId]/schema";

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    item_id: uuid("item_id")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
    message: text("message").notNull(),
    is_read: boolean("is_read").default(false).notNull(),

    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    by_user_idx: index("notifications_user_idx").on(t.user_id),
    by_item_idx: index("notifications_item_idx").on(t.item_id),
  }),
);