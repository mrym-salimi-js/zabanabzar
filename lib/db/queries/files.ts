import { files } from "./../schema/files";
import { db } from "../index";
import { desc, eq, inArray, sql } from "drizzle-orm";
import { FileTypes } from "@/types/file";

export type FileInsertType = typeof files.$inferInsert;
export type FileSelectType = typeof files.$inferSelect;

// Create new file
export async function craeteFile(date: FileInsertType[]) {
  const result = await db.insert(files).values(date).returning();
  return result[0];
}

// Get all files by limit for pagination
export async function getAllFiles(
  type: FileTypes,
  page: number,
  limit: number
) {
  const items = await db
    .select()
    .from(files)
    .orderBy(desc(files.createdAt))
    .where(eq(files.type, type))
    .limit(limit)
    .offset((page - 1) * limit);

  const countResult = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(files)
    .where(eq(files.type, type));

  const total = countResult[0]?.count ?? 0;

  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasMore: page * limit < total,
  };
}

// Get special file
export async function getFileById(id: number) {
  const result = await db.select().from(files).where(eq(files.id, id));
  return result[0];
}

// Update special file
export async function updateFile(id: number, text: string) {
  return db
    .update(files)
    .set({
      exText: text,
    })
    .where(eq(files.id, id))
    .returning();
}

// Delete files in array
export async function deleteArryFiles(ids: number[]) {
  return await db.delete(files).where(inArray(files.id, ids));
}
