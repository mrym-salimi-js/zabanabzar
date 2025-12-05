import { WordType } from "@/types/flashCard";

export const wordsTypes: Record<WordType, string> = {
  Noun: "bg-orange-500",
  Adjective: "bg-purple-400",

  Adverb: "bg-blue-500",

  Unknown: "bg-gray-500",
  Pronoun: "bg-pink-500",
  Verb: "bg-yellow-500",
};
