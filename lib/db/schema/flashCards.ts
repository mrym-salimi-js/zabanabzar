import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const wordType = pgEnum("word_type", [
  "text",
  "document",
  "podcast",
  "video",
  "image",
]);

export const flashCards = pgTable("flashCards", {
  id: serial("id").primaryKey(),
  type: wordType("type").notNull(),
  word: varchar("name", { length: 255 }),
  audioUrl: text("audioUrl"),
  description: text("description"),
  example: text("example"),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  repeatEvery: varchar("repeatEvery", { length: 255 }),
  lastReviewed: timestamp("created_at").notNull(),
  nextReview: timestamp("created_at").notNull(),
});
