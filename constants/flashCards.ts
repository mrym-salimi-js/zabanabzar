import { wordType } from "./../lib/db/schema/flashCards";
import { RepeatedEveryTypes, WordTypes } from "@/types/flashcard";

export const wordTypes = [
  "Noun",
  "Pronoun",
  "Verb",
  "Adjective",
  "Adverb",
  "Unknown",
] as const;

export const repeatedEveryTypes = ["1", "2", "3"] as const;

export type SecndParam = {
  label: string;
  bg: string;
};

export const wordTypesColored: Record<WordTypes, string> = {
  Noun: "bg-orange-300",
  Pronoun: "bg-purple-300",
  Verb: "bg-pink-300",
  Adjective: "bg-brown-300",
  Adverb: "bg-yellow-300",
  Unknown: "bg-gray-300",
};

export const wordRepeatDay: Record<RepeatedEveryTypes, SecndParam> = {
  "1": { label: "اسان", bg: "bg-blue-300" },
  "2": { label: "معمولی", bg: "bg-red-300" },
  "3": { label: "سخت", bg: "bg-purple-300" },
};
