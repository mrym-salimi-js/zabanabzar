import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface pageState {
  page: number;
  setPage: (page: number) => void;
  setNextPage: () => void;
  setPrevPage: (totalPages: number) => void;
}

export const useFilesPage = create<pageState>()(
  persist(
    (set) => ({
      page: 1,
      setPage: (page) => {
        set({ page });
      },
      setNextPage: () => {
        set((state) => ({ page: Math.max(1, state.page - 1) }));
      },
      setPrevPage: (totalPages) => {
        set((state) => ({ page: Math.min(state.page + 1, totalPages) }));
      },
    }),
    {
      name: "files-ui-page", // Key of local storage
      storage: createJSONStorage(() => localStorage), // We can use session storage
    }
  )
);
