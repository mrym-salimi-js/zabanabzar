export async function downloadFileFromStorageService(fileUrl: string) {
  const key = fileUrl.split(`/`)[4];

  const res = await fetch(`/api/files/storage?key=${encodeURIComponent(key)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return res;
}
