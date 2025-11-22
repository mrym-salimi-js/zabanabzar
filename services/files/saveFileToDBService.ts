import { CleanFileType } from "@/types/file";

export async function saveFileToDBService(data: CleanFileType[]) {
  try {
    const res = await fetch("/api/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("خطا در ذخیره ");
    return res.json();
  } catch (error) {
    console.dir(error);
    return error;
  }
}
