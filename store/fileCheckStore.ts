import { create } from "zustand";

type FileSelectionStore = {
  selectedUrls: string[];
  selectAll: (urls: string[]) => void;
  clearAll: () => void;
  toggleId: (url: string) => void;
};

export const useFileCheckStore = create<FileSelectionStore>((set) => ({
  selectedUrls: [],

  selectAll: (urls: string[]) => set({ selectedUrls: urls }),

  clearAll: () => set({ selectedUrls: [] }),

  toggleId: (url: string) =>
    set((state) => ({
      selectedUrls: state.selectedUrls.includes(url)
        ? state.selectedUrls.filter((i) => i !== url)
        : [...state.selectedUrls, url],
    })),
}));
