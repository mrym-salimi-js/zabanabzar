import { desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "../index";
import { flashCards } from "../schema/flashCards";
import { CleanWordType } from "@/types/flashCard";

export type FileInsertType = typeof flashCards.$inferInsert;
export type flashCardselectType = typeof flashCards.$inferSelect;

// Create new file
export async function createFlashCard(data: CleanWordType) {
  const now = new Date();

  const repeatEvery = data.repeatEvery ?? 1;

  const result = await db
    .insert(flashCards)
    .values({
      ...data,
      lastReviewed: now,
      nextReview: new Date(now.getTime() + +repeatEvery * 24 * 60 * 60 * 1000),
    })
    .returning();

  return result[0];
}

// Get all flashCards by limit for pagination
export async function getAllFlashCards(page: number, limit: number) {
  const items = await db
    .select()
    .from(flashCards)
    .orderBy(desc(flashCards.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  const countResult = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(flashCards);

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
export async function getFlashCardsById(id: number) {
  const result = await db
    .select()
    .from(flashCards)
    .where(eq(flashCards.id, id));
  return result[0];
}

// Update special file
export async function updateflashCards(id: number) {
  return db
    .update(flashCards)
    .set({
      updatedAt: new Date(),
    })
    .where(eq(flashCards.id, id))
    .returning();
}

// Delete flashCards in array
export async function deleteArryFlashCards(ids: number[]) {
  return await db.delete(flashCards).where(inArray(flashCards.id, ids));
}
