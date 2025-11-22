import {
  pgTable,
  serial,
  varchar,
  bigint,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Upload type (file upload or plain text input)
export const uploadType = pgEnum("upload_type", ["file", "text"]);

export const files = pgTable("files", {
  id: serial("id").primaryKey(),

  // Indicates whether the record is a file upload or a text input
  type: uploadType("type").notNull().default("file"),

  // ===== File fields =====
  // File name (nullable for text input)
  name: varchar("name", { length: 255 }),
  // File size in bytes (nullable for text input)
  size: bigint("size", { mode: "number" }),
  // File extension (nullable for text input)
  ext: varchar("ext", { length: 10 }),
  // File URL (nullable for text input)
  url: text("url"),

  // ===== Text input =====
  // Raw text content entered by the user
  textContent: text("text_content"),

  // ===== Extracted / processed output =====
  // Could be OCR output, AI processing results, summaries, etc.
  exText: text("ex_text"),

  // Owner of the upload
  userId: integer("user_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),

  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .notNull(),
});
