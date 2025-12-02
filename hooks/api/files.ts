import { createWorker } from "tesseract.js";
import { deleteAllFilesFromIndexedDB } from "@/lib/indexedDB";
import { deleteFileFromDBService } from "@/services/files/deleteFileFromDBService";
import { extractTextFromFileService } from "@/services/files/extractTextFromFileService";
import { saveFileToDBService } from "@/services/files/saveFileToDBService";
import { updateExTextInDBService } from "@/services/files/updateExTextInDBService";
import { useExtractTextStore } from "@/store/extractTextFromFileStore";
import { useUploadStore } from "@/store/uploadFileStore";
import { CheckedFile, CleanFileType } from "@/types/file";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { downloadFileInBrowserService } from "@/services/files/downloadFileInBrowserService";
import { useDeleteFilesFromStorage } from "./deleteFileFromStorage";

// Delete Files custom hook
export const useDeleteFiles = () => {
  const queryClient = useQueryClient();
  const deleteFileFromStorageMutation = useDeleteFilesFromStorage();
  return useMutation({
    mutationFn: async (files: CheckedFile[]) => {
      // 1) Delete from DB
      const res = await deleteFileFromDBService(files);

      // 2) Delete from Storage
      deleteFileFromStorageMutation.mutate(files);

      return await res.json();
    },

    onSuccess: () => {
      toast.success("حذف باموفقیت انجام شد");
      queryClient.invalidateQueries({ queryKey: ["files"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["files-infinite"],
        exact: false,
      });
    },
    onError: () => toast.error("خطا در حذف"),
  });
};

// Save files to DB custom hook
export const useSaveFileToDB = () => {
  const queryClient = useQueryClient();
  const { clearFiles } = useUploadStore();
  return useMutation({
    mutationFn: async (data: CleanFileType[]) => {
      return await saveFileToDBService(data);
    },
    onSuccess: () => {
      clearFiles();
      deleteAllFilesFromIndexedDB();

      // Update files list
      queryClient.invalidateQueries({ queryKey: ["files"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["files-infinite"],
        exact: false,
      });

      toast.success("ذخیره سازی با موفقیت انجام شد");
    },
    onError: () => toast.error("ارسال ناموفق بود"),
  });
};

// Download files from s3 custom hook
export const useDownloadFile = () => {
  return useMutation({
    mutationFn: async (checkeds: CheckedFile[]) => {
      for (const item of checkeds) {
        if (!item.url) return;
        await downloadFileInBrowserService(item.url);
      }
    },
    onSuccess: () => {
      toast.success("دانلود با موفقیت انجام شد");
    },
    onError: () => {
      toast.error("خطا در دانلود");
    },
  });
};

export const useExtractionText = () => {
  type ExtractPayload = {
    fileUrl: string;
    fileId: number;
    fileExt: string | null;
  };
  const queryClient = useQueryClient();
  const { updateStatus, removeExtraction } = useExtractTextStore();

  return useMutation({
    mutationFn: async ({ fileUrl, fileId, fileExt }: ExtractPayload) => {
      updateStatus(fileId, "extracting");

      if (fileExt === "PNG" || fileExt === "JPG" || fileExt === "JPEG") {
        // Images extraction (work for "eng" language) --> Extract heare because "tesseract.js" package work on client not server
        const worker = await createWorker("eng");
        const ret = await worker.recognize(fileUrl);
        await worker.terminate();
        const text = ret.data.text;
        console.log(text);

        return { text };
      } else {
        const res = await extractTextFromFileService(fileUrl);

        const text = await res.text();

        if (!res.ok) throw new Error(`خطای استخراج فایل: ${text}`);

        const data = JSON.parse(text);

        return data;
      }
    },
    onSuccess: async (data, variables: ExtractPayload) => {
      updateStatus(variables.fileId, "success");

      const id = variables.fileId;
      const text = data.text;

      const res = await updateExTextInDBService(id, text);

      if (!res.ok) toast.error("خطا در ذخیره متن  استخراج شده");

      toast.success("متن استخراج شده ذخیره شد");
      queryClient.invalidateQueries({ queryKey: ["files"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["files-infinite"],
        exact: false,
      });

      // Hide notification after success mode
      const timer = setTimeout(() => {
        removeExtraction(variables.fileId);
      }, 1000);

      return () => clearTimeout(timer);
    },
    onError: (err, variables: ExtractPayload) => {
      updateStatus(variables.fileId, "error");

      const timer = setTimeout(() => {
        removeExtraction(variables.fileId);
      }, 5000);

      return () => clearTimeout(timer);
    },
  });
};
export type EditeExTextMutation = {
  id: number;
  text: string | undefined;
};
export const useEditExtractionText = () => {
  return useMutation<Response, Error, EditeExTextMutation>({
    mutationFn: async ({ id, text }) => {
      return updateExTextInDBService(id, text);
    },
    onSuccess: () => {
      toast.success("متن شما اپدیت شد");
    },
    onError: () => {
      toast.error("خطا در اپدیت متن");
    },
  });
};
