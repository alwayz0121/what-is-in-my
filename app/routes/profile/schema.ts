import {
    pgTable,
    uuid,
    text,
    timestamp,
  } from "drizzle-orm/pg-core";

  export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(), // Supabase Auth user_id (UUID)
    provider: text("provider").notNull().default("kakao"), // kakao, google 등
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  });
  

export const profiles = pgTable("profiles", {
    id: uuid("id")
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }),
    nickname: text("nickname"),
    email: text("email"),
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  });