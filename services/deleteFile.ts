import { deleteFileFromIndexedDB } from "@/lib/indexedDB";
import { useUploadStore } from "@/store/uploadFileStore";
import toast from "react-hot-toast";

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
    const res = await fetch("/api/files/storage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileUrl }),
    });

    // Toast erorr
    if (!res.ok) toast.error("حذف فایل از سرور موفق نبود");
    // Remove from localStorage
    removeFile(id);
    deleteFileFromIndexedDB(id);
  } catch (error) {
    console.dir(error);
    toast.error(`خطا در حذف فایل از server storage`);
  }
};
