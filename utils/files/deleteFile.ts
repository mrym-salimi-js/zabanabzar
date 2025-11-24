import { CheckedFile } from "./../../types/file.d";
import { deleteFileFromIndexedDB } from "@/lib/indexedDB";
import { deleteFileFromStorageService } from "@/services/files/deleteFileFromStorageService";
import { useUploadStore } from "@/store/uploadFileStore";
import toast from "react-hot-toast";

export const deleteFile = async (
  status: string,
  id: string,
  checkedFile: CheckedFile
) => {
  const { removeFile } = useUploadStore.getState();

  if (status === "error" || checkedFile === undefined) {
    removeFile(id);
    deleteFileFromIndexedDB(id);
    return;
  }

  if (!checkedFile) return;

  try {
    const checkedFiles = [checkedFile];

    await deleteFileFromStorageService(checkedFiles);

    removeFile(id);
    deleteFileFromIndexedDB(id);
  } catch (error) {
    console.dir(error);
    toast.error(`خطا در حذف فایل از سرور`);
  }
};
