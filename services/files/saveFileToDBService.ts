import { CleanFileType } from "@/types/file";

export async function saveFileToDBService(data: CleanFileType[]) {
  try {
    const res = await fetch("/api/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.error || "خطا در ذخیره فایل‌ها");
    }
    return res.json();
  } catch (error) {
    console.dir(error);
    throw error;
  }
}
