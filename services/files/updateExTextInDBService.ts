export async function updateExTextInDBService(
  id: number,
  text: string | undefined
) {
  const res = await fetch("/api/files", {
    method: "PATCH",
    body: JSON.stringify({ id, text }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error || "خطا در به‌روزرسانی متن فایل");
  }
  return res;
}
