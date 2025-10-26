import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StatusFile = "uploading" | "done" | "error";

export interface UploadFilePersist {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: StatusFile;
  url?: string | undefined;
}

interface UploadState {
  files: UploadFilePersist[];
  addFiles: (item: UploadFilePersist) => void;
  updateProgress: (id: string, progress: number) => void;
  updateStatus: (id: string, status: StatusFile, url?: string) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
}

export const useUploadStore = create<UploadState>()(
  persist(
    (set) => ({
      files: [],
      addFiles: (item) =>
        set((state) => ({
          files: [item, ...state.files],
        })),

      updateProgress: (id, progress) =>
        set((state) => ({
          files: state.files.map((item) =>
            id === item.id ? { ...item, progress } : item
          ),
        })),

      updateStatus: (id, status, url?) =>
        set((state) => ({
          files: state.files.map((item) =>
            id === item.id ? { ...item, status, url } : item
          ),
        })),

      removeFile: (id) =>
        set((state) => ({
          files: state.files.filter((item) => id !== item.id),
        })),

      clearFiles: () => set({ files: [] }),
    }),
    {
      name: "upload-files-storage", // Key of local storage
      storage: createJSONStorage(() => localStorage), //We can use session storage
    }
  )
);
