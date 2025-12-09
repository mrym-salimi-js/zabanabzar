import { CheckedFile } from "@/types/file";
import {
  CleanWordType,
  FlashCardItem,
  FlashCardstResponse,
} from "@/types/flashcard";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteFilesFromStorage } from "./deleteFileFromStorage";
import { deleteFlashCardsFromDBService } from "@/services/flashCards/deleteFlashCardsFromDBService";

type Variables = { data: CleanWordType };

export const useUpladeFlashCard = (): UseMutationResult<
  FlashCardstResponse,
  Error,
  Variables
> => {
  const queryClient = useQueryClient();
  return useMutation<FlashCardstResponse, Error, Variables>({
    mutationFn: async ({ data }: Variables) => {
      try {
        const res = await fetch("/api/flashcards", {
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
      queryClient.invalidateQueries({ queryKey: ["flashCards-infinite"] });
    },
    onError: () => {
      toast.error("خطا در ساخت فلش کارت");
    },
  });
};

export const useEditFlashCard = (): UseMutationResult<
  FlashCardItem,
  Error,
  Variables
> => {
  const queryClient = useQueryClient();
  return useMutation<FlashCardItem, Error, Variables>({
    mutationFn: async ({ data }: Variables) => {
      try {
        const res = await fetch("/api/flashcards", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData?.error || "خطا در ویرایش فلش کارت");
        }
        return res.json();
      } catch (error) {
        console.dir(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("فلش کارت شما ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["flashCards-infinite"] });
    },
    onError: () => {
      toast.error("خطا در ویرایش فلش کارت");
    },
  });
};

// Delete flashCards custom hook
export const useDeleteFlashCards = () => {
  const queryClient = useQueryClient();
  const deleteFileFromStorageMutation = useDeleteFilesFromStorage();
  return useMutation({
    mutationFn: async (flashCards: CheckedFile[]) => {
      // 1) Delete from DB
      const res = await deleteFlashCardsFromDBService(flashCards);

      // 2) Delete from Storage
      deleteFileFromStorageMutation.mutate(flashCards);

      return await res.json();
    },

    onSuccess: () => {
      toast.success("حذف باموفقیت انجام شد");
      queryClient.invalidateQueries({ queryKey: ["flashCards-infinite"] });
    },
    onError: () => toast.error("خطا در حذف"),
  });
};
