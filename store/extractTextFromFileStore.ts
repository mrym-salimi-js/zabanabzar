import { create } from "zustand";

export type ExtractionStatus = "pending" | "extracting" | "success" | "error";
export interface ExtractionFile {
  id: number;
  name: string;
  status: ExtractionStatus;
  text?: string;
}

type Extractions = {
  extractedFiles: ExtractionFile[];

  updateStatus: (id: number, status: ExtractionStatus) => void;
  addExtraction: (id: number, name: string, status?: "pending") => void;
  removeExtraction: (id: number) => void;
};

export const useExtractTextStore = create<Extractions>((set) => ({
  extractedFiles: [], // initialize empty array

  addExtraction: (id: number, name: string) =>
    set((state) => ({
      extractedFiles: [
        ...state.extractedFiles,
        { id, name, status: "pending" as ExtractionStatus },
      ],
    })),

  updateStatus: (id: number, status: ExtractionStatus) =>
    set((state) => ({
      extractedFiles: state.extractedFiles.map((file) =>
        file.id === id ? { ...file, status } : file
      ),
    })),
  removeExtraction: (id: number) =>
    set((state) => ({
      extractedFiles: state.extractedFiles.filter((file) => file.id !== id),
    })),
}));
