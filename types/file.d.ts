export type FileTypes = "text" | "document" | "podcast" | "video" | "image";

export interface FileItem {
  id: number;
  name: string;
  size: number;
  exText: string | null;
  textContent: string | null;
  ext: string;
  type: FileTypes;
  createdAt: string;
  updatedAt: string;
  url: string;
  userId: number;
}

export type FileListResponse = FileItem[];

export type CheckedFile = {
  id: number;
  url: string | undefined;
};
export type FileUpload = {
  type: FileTypes;
  name: string;
  size: number;
  url: string | undefined;
  ext: string;
  userId: number;
};

export type TextUpload = {
  type: "text";
  textContent: string;
  userId: number;
};

export type CleanFileType = FileUpload | TextUpload;
