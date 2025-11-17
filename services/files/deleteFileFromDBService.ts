export async function deleteFileFromDBService(files: string[]) {
  const res = await fetch("/api/files", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(files),
  });
  return res;
}
