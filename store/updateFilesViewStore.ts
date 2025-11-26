import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Views = "list" | "card";

interface ViewState {
  view: Views | null;
  setView: (view: Views) => void;
}

export const useViewFiles = create<ViewState>()(
  persist(
    (set) => ({
      view: null,
      setView: (view) => {
        set({ view });
      },
    }),
    {
      name: "files-ui-view", // Key of local storage
      storage: createJSONStorage(() => localStorage), // We can use session storage
    }
  )
);
