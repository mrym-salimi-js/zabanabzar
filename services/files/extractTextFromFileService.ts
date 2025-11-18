export async function extractTextFromFileService(fileUrl: string) {
  const res = await fetch("/api/files/extract", {
    method: "POST",
    body: JSON.stringify({ fileUrl }),
    headers: { "Content-Type": "application/json" },
  });
  return res;
}
