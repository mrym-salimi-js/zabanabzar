export const fileTypes = [
  "document",
  "text",
  "image",
  "video",
  "podcast",
] as const;
export const imageTypes = ["PNG", "JPG", "JPEG"] as const;
export const documentTypes = ["txt", "pdf", "docx"] as const;

export const fileTypeColorClasses: Record<string, string> = {
  // Images
  png: "text-[var(--secondary)]",
  jpg: "text-orange-500",
  jpeg: "text-purple-400",

  // Word
  docx: "text-blue-500",

  // Pdf
  pdf: "text-[var(--primary)]",

  // Text
  txt: "text-gray-500",
  md: "text-brown-500",

  // Voice
  mp3: "text-pink-500",
  wav: "text-pink-400",

  // Video
  mp4: "text-indigo-500",
  mov: "text-indigo-400",

  // default
  default: "text-yellow-600",
};
