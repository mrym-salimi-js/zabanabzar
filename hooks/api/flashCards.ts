import { getFileFromIndexedDB } from "@/lib/indexedDB";
import { CleanWordType } from "@/types/flashCard";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpladeFlashCard = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: CleanWordType }) => {
      const audioId = data?.audioId;
      if (!audioId) return;
      const audioFile = await getFileFromIndexedDB(audioId);
      if (audioFile) "";
    },
    onSuccess: () => {
      toast.success("فلش کارت شما ساخته شد");
    },
    onError: () => {
      toast.error("خطا در ساخت فلش کارت");
    },
  });
};
