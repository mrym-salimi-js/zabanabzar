export async function deleteFromStorage(file: string[]) {
  await fetch("/api/files/storage", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileUrls: file }),
  });
}
