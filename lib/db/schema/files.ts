import {
  pgTable,
  serial,
  varchar,
  bigint,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const files = pgTable("files", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),

  size: bigint("size", { mode: "number" }).notNull(),

  ext: varchar("ext", { length: 10 }).notNull(),

  url: text("url").notNull(),

  exText: text("ex_text"),

  userId: integer("user_id").notNull(),

  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .notNull(),
});
