import { deleteFileFromStorageService } from "@/services/files/deleteFileFromStorageService";
import { CheckedFile } from "@/types/file";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteFilesFromStorage = () => {
  return useMutation({
    mutationFn: async (files: CheckedFile[]) => {
      // 2) Delete from Storage
      await deleteFileFromStorageService(files);
    },

    onSuccess: () => {
      toast.success("فایل از حافظه حذف شد");
    },
    onError: () => toast.error("خطا در حذف"),
  });
};
