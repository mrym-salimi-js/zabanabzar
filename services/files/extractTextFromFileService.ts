export async function extractTextFromFileService(fileUrl: string) {
  const res = await fetch("/api/files/extract", {
    method: "POST",
    body: JSON.stringify({ fileUrl }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error || "خطا در استخراج متن از فایل");
  }

  return res;
}
