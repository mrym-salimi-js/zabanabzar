export async function deleteFileFromStorageService(file: string[]) {
  const res = await fetch("/api/files/storage", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileUrls: file }),
  });

  return res;
}
