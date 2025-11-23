import { CheckedFile } from "@/types/file";

export async function deleteFileFromStorageService(file: CheckedFile[]) {
  const res = await fetch("/api/files/storage", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ checkedFiles: file }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || "خطا در حذف فایل از استوریج");
  }
  return;
}
