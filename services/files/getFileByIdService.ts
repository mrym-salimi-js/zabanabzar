export async function getFileByIdService(fileId: string) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/files/${fileId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    if (res.status === 404) return null; // فایل وجود ندارد
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error || "خطا در دریافت اطلاعات");
  }

  const data = await res.json();
  return data;
}
