import {
  deleteAllFilesFromIndexedDB,
  getFileFromIndexedDB,
} from "@/lib/indexedDB";
import { deleteFileFromDBService } from "@/services/files/deleteFileFromDBService";
import { deleteFileFromStorageService } from "@/services/files/deleteFileFromStorageService";
import { downloadFileFromStorageService } from "@/services/files/downloadFileFromStorageService";
import { saveFileToDBService } from "@/services/files/saveFileToDBService";
import { uploadFileToStorageService } from "@/services/files/uploadFileToStorageService";
import { useUploadStore } from "@/store/uploadFileStore";
import { CleanFileType } from "@/types/file";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Delete Files custom hook
export const useDeleteFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files: string[]) => {
      const res = await deleteFileFromDBService(files);

      await deleteFileFromStorageService(files);

      if (!res.ok) throw new Error("خطا در حذف");
      return res.json();
    },
    onSuccess: () => {
      toast.success("حذف باموفقیت انجام شد");
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: () => toast.error("خطا در حذف"),
  });
};

// Upload files custom hook
export const useUploadFile = () => {
  const { updateProgress, updateStatus } = useUploadStore.getState();

  return useMutation({
    mutationFn: async (id: string) => {
      const file = await getFileFromIndexedDB(id);
      if (!file) throw new Error("فایلی یافت نشد!");

      updateStatus(id, "uploading");

      const fileUrl = await uploadFileToStorageService(file, (percent) => {
        updateProgress(id, percent);
      });

      updateStatus(id, "done", fileUrl);
      return fileUrl;
    },
    onError: (err, id: string) => {
      updateStatus(id, "error");
      toast.error("خطا در بارگذاری فایل");
    },
    onMutate: (id: string) => {
      updateProgress(id, 0);
    },
  });
};

// Save files to database
export const useSaveFileToDB = () => {
  const { clearFiles } = useUploadStore.getState();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files: CleanFileType[]) => {
      const res = await saveFileToDBService(files);
      if (!res.ok) throw new Error("خطا در ذخیره ");
      return res.json();
    },
    onSuccess: () => {
      clearFiles();
      deleteAllFilesFromIndexedDB();
      toast.success("ذخیره سازی با موفقیت انجام شد");

      // Update files list
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: () => toast.error("ارسال ناموفق بود"),
  });
};

// Download files from s3
export const useDownloadFile = () => {
  return useMutation({});
};
export const useExtractionText = () => {
  return useMutation({
    mutationFn: async (fileUrl: string) => {
      const res = await downloadFileFromStorageService(fileUrl);
      if (!res.ok) throw "خطا در دانلود";

      return res;
    },
  });
};
