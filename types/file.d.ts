export type FileTypes = "text" | "document" | "podcast" | "video";

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
  url: string;
};
export type DocUpload = {
  type: "document";
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

export type CleanFileType = DocUpload | TextUpload;
