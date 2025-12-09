import { downloadFileInBrowserService } from "@/services/files/downloadFileInBrowserService";
import { CheckedFile } from "@/types/file";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Download files from s3 custom hook
export const useDownloadFiles = () => {
  return useMutation({
    mutationFn: async (checkeds: CheckedFile[]) => {
      for (const item of checkeds) {
        if (!item.url) throw Error;
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
