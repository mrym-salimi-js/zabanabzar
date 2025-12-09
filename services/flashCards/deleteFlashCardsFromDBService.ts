import { CheckedFile } from "@/types/file";

export async function deleteFlashCardsFromDBService(
  checkedFiles: CheckedFile[]
) {
  const res = await fetch("/api/flashcards", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(checkedFiles),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "خطا در حذف فلش کارت از دیتابیس");
  }

  return res;
}
