import { CleanWordType } from "@/types/flashcard";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpladeFlashCard = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: CleanWordType }) => {
      try {
        const res = await fetch("/api/flashCards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData?.error || "خطا در ذخیره فلش کارت");
        }
        return res.json();
      } catch (error) {
        console.dir(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("فلش کارت شما ساخته شد");
    },
    onError: () => {
      toast.error("خطا در ساخت فلش کارت");
    },
  });
};
