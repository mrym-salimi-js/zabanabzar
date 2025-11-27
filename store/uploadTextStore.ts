import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UploadTextPersist {
  title: string;
  content: string;
  type: "text";
}

interface UploadState {
  text: UploadTextPersist;
  addTextContent: (content: string) => void;
  addTextTitle: (title: string) => void;
  clearTextStorage: () => void;
}

export const useUploadTextStore = create<UploadState>()(
  persist(
    (set) => ({
      text: {
        title: "",
        content: "",
        type: "text",
      },

      addTextContent: (content) =>
        set((state) => ({
          text: {
            ...state.text,
            content,
          },
        })),

      addTextTitle: (title) =>
        set((state) => ({
          text: {
            ...state.text,
            title,
          },
        })),

      clearTextStorage: () =>
        set({
          text: {
            title: "",
            content: "",
            type: "text",
          },
        }),
    }),
    {
      name: "upload-files-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
