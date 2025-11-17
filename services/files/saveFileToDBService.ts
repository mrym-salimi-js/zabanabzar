import { CleanFileType } from "@/types/file";

export async function saveFileToDBService(files: CleanFileType[]) {
  const res = await fetch("/api/files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(files),
  });

  return res;
}
