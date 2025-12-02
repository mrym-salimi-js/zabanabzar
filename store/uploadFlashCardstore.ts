"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  saveFileToIndexedDB,
  getFileFromIndexedDB,
  deleteAllFilesFromIndexedDB,
  deleteFileFromIndexedDB,
} from "@/lib/indexedDB";
import { WordData } from "@/types/flashCard";

interface UploadFlashCard {
  currentWord: WordData;
  status: "idle" | "recording" | "recorded";
  setWord: (word: string) => void;
  setTranslation: (translation: string) => void;
  setDescription: (word: string) => void;
  setExample: (word: string) => void;
  setWordType: (word: string) => void;
  startRecording: () => void;
  stopRecording: (blob: Blob) => Promise<void>;
  getWordAudio: () => Promise<File | null>;
  setWordAudioUrl: (url: string) => void;
  clearStore: () => Promise<void>;
  clearAudio: (audioId: string) => void;
}
const getInitialWord = (): WordData => ({
  id: crypto.randomUUID(),
  word: "",
  translation: "",
  example: "",
  description: "",
  type: "Unknown",
  repeat: "3",
});

export const useFlashCardStore = create<UploadFlashCard>()(
  persist(
    (set, get) => ({
      currentWord: getInitialWord(),
      status: "idle",

      setWord: (word) =>
        set((state) => ({
          currentWord: {
            ...state.currentWord,
            word,
          },
        })),
      setTranslation: (translation) =>
        set((state) => ({
          currentWord: {
            ...state.currentWord,
            translation,
          },
        })),
      setDescription: (description) =>
        set((state) => ({
          currentWord: {
            ...state.currentWord,
            description,
          },
        })),
      setExample: (example) =>
        set((state) => ({
          currentWord: {
            ...state.currentWord,
            example,
          },
        })),
      setWordType: (type) =>
        set((state) => ({
          currentWord: {
            ...state.currentWord,
            type,
          },
        })),

      startRecording: () => set({ status: "recording" }),

      stopRecording: async (blob) => {
        const word = get().currentWord;

        if (!word) return;

        const file = new File([blob], "voice.webm", { type: "audio/webm" });
        const audioId = `audio-${word.id}`;
        await saveFileToIndexedDB(audioId, file);

        set({
          currentWord: { ...word, audioId },
          status: "recorded",
        });
      },

      getWordAudio: async () => {
        const word = get().currentWord;
        if (!word?.audioId) return null;
        return getFileFromIndexedDB(word.audioId);
      },

      setWordAudioUrl: (url) => {
        const word = get().currentWord;
        if (!word) return;
        set({
          currentWord: { ...word, audioUrl: url },
        });
      },

      clearStore: async () => {
        await deleteAllFilesFromIndexedDB();
        set({
          currentWord: getInitialWord(),
          status: "idle",
        });
      },
      clearAudio: async (audioId) => {
        if (audioId) await deleteFileFromIndexedDB(audioId);
        const word = get().currentWord;
        if (!word) return;
        const id = "";
        set({
          currentWord: { ...word, audioId: id },
          status: "idle",
        });
      },
    }),
    { name: "current-word-storage" }
  )
);
