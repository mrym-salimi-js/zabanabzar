import { files } from "./../schema/files";
import { db } from "../index";
import { eq, inArray } from "drizzle-orm";

export type FileInsertType = typeof files.$inferInsert;
export type FileSelectType = typeof files.$inferSelect;

// Create new file
export async function craeteFile(date: FileInsertType[]) {
  const result = await db.insert(files).values(date).returning();
  return result[0];
}

// Get all files
export async function getAllFiles() {
  return await db.select().from(files).orderBy(files.createdAt);
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
export async function deleteArryFiles(ids: string[]) {
  return await db.delete(files).where(inArray(files.url, ids));
}
