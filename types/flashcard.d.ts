import { repeatedEveryTypes, wordTypes } from "@/constants/flashCards";

export type WordTypes = (typeof wordTypes)[number]; // [number] pointedt to index of array
export type RepeatedEveryTypes = (typeof repeatedEveryTypes)[number];

export interface WordData {
  word: string;
  translation: string;
  example: string;
  description: string;
  type: WordTypes;
  audioUrl?: string;
  repeatEvery: RepeatedEveryTypes;
}
export interface CleanWordType extends WordData {
  userId: number;
}

export interface FlashCardItem extends WordData {
  id: number;
  lastReviewed: string;
  nextReview: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface FlashCardstResponse {
  items: FlashCardItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}
