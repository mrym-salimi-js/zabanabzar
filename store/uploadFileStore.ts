import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StatusFile = "uploading" | "done" | "error";

interface UploadFilePersist {
  mainFile: File;
  name: string;
  size: number;
  progress: number;
  status: StatusFile;
  url?: string;
}

interface UploadState {
  files: UploadFilePersist[];
  addFiles: (newFiles: File[]) => void;
  updateProgress: (index: number, progress: number) => void;
  updateStatus: (index: number, status: StatusFile, url?: string) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

export const useUploadStore = create<UploadState>()(
  persist(
    (set) => ({
      files: [],
      addFiles: (newFiles: File[]) =>
        set((state) => ({
          files: [
            ...newFiles.map((file) => ({
              mainFile: file,
              name: file.name,
              size: file.size,
              progress: 0,
              status: "uploading" as const,
              url: undefined,
            })),
            ...state.files,
          ],
        })),

      updateProgress: (index: number, progress: number) =>
        set((state) => ({
          files: state.files.map((item, i) =>
            i === index ? { ...item, progress } : item
          ),
        })),

      updateStatus: (index: number, status: StatusFile, url?: string) =>
        set((state) => ({
          files: state.files.map((item, i) =>
            i === index ? { ...item, status, url } : item
          ),
        })),

      removeFile: (index: number) =>
        set((state) => ({ files: state.files.filter((f, i) => i !== index) })),

      clearFiles: () => set({ files: [] }),
    }),
    {
      name: "upload-files-storage", // Key of local storage
      storage: createJSONStorage(() => localStorage), //We can use session storage
    }
  )
);
