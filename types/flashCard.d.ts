export interface WordData {
  id: string;
  word: string;
  translation: string;
  example: string;
  description: string;
  type: string;
  audioId?: string;
  audioUrl?: string;
  repeat: string;
}
export interface CleanWordType extends WordData {
  userId: number;
}
