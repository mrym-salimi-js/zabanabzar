import { CheckedFile } from "@/types/file";

export async function deleteFileFromDBService(checkedFiles: CheckedFile[]) {
  const res = await fetch("/api/files", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(checkedFiles),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "خطا در حذف فایل از دیتابیس");
  }

  return;
}
