import { CheckedFile } from "@/types/file";

export async function deleteFileFromStorageService(file: CheckedFile[]) {
  const res = await fetch("/api/files/storage", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ checkedFiles: file }),
  });

  return res;
}
