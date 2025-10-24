import { create } from "zustand";

type StatusFile = "uploading" | "done" | "error";

interface UploadFile {
  file: File;
  progress: number;
  status: StatusFile;
  url?: string;
}

interface UploadState {
  files: UploadFile[];
  addFiles: (newFiles: File[]) => void;
  updateProgress: (index: number, progress: number) => void;
  updateStatus: (index: number, status: StatusFile, url: string) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  files: [],
  //Add new file into state
  addFiles: (newFiles: File[]) =>
    set((state) => ({
      files: [
        ...state.files,
        ...newFiles.map((file) => ({
          file,
          progress: 0,
          status: "uploading" as const,
        })),
      ],
    })),

  // Update progress of each file
  updateProgress: (index: number, progress: number) =>
    set((state) => ({
      files: state.files.map((item, i) =>
        i === index ? { ...item, progress } : item
      ),
    })),

  // Set changing status for each file
  updateStatus: (index: number, status: StatusFile, url: string) =>
    set((state) => ({
      files: state.files.map((item, i) =>
        i === index ? { ...item, status, url } : item
      ),
    })),
}));
