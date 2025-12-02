export type WordType =
  | "Noun"
  | "Pronoun"
  | "Verb"
  | "Adjective"
  | "Adverb"
  | "Unknown";
export interface WordData {
  word: string;
  translation: string;
  example: string;
  description: string;
  type: WordType;
  audioUrl?: string;
  repeatEvery: string;
}
export interface CleanWordType extends WordData {
  userId: number;
}
