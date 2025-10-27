import { deleteFileFromIndexedDB } from "@/lib/indexedDB";
import { useUploadStore } from "@/store/uploadFileStore";

export const deleteFile = async (
  status: string,
  id: string,
  fileUrl: string | undefined
) => {
  const { removeFile } = useUploadStore.getState();

  if (status === "error" || fileUrl === undefined) {
    removeFile(id);
    deleteFileFromIndexedDB(id);
  }
  if (!fileUrl) return;

  try {
    const res = await fetch("/api/upload/storage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileUrl }),
    });

    // Throw erorr
    if (!res.ok) throw new Error("حذف سرور موفق نبود");
    // Remove from localStorage
    removeFile(id);
    deleteFileFromIndexedDB(id);
  } catch (error) {
    console.error("خطا در حذف فایل از S3:", error);
  }
};
