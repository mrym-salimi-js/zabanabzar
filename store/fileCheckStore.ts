import { CheckedFile } from "@/types/file";
import { create } from "zustand";

type FileSelectionStore = {
  CheckedFiles: CheckedFile[];
  selectAll: (files: CheckedFile[]) => void;
  clearAll: () => void;
  toggleId: (file: CheckedFile) => void;
};

export const useFileCheckStore = create<FileSelectionStore>((set) => ({
  CheckedFiles: [],

  selectAll: (files: CheckedFile[]) => set({ CheckedFiles: files }),

  clearAll: () => set({ CheckedFiles: [] }),

  toggleId: (file: CheckedFile) =>
    set((state) => {
      const exists = state.CheckedFiles.some((f) => f.id === file.id);

      return {
        CheckedFiles: exists
          ? state.CheckedFiles.filter((f) => f.id !== file.id) // remove
          : [...state.CheckedFiles, file], // add
      };
    }),
}));
