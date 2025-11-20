export async function downloadFileFromStorageService(fileUrl: string) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const key = fileUrl.split(`/`)[4];

  const res = await fetch(
    `${baseUrl}/api/files/storage?key=${encodeURIComponent(key)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  return res;
}
