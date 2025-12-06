import { documentTypes, fileTypes, imageTypes } from "@/constants/files";

export type FileTypes = (typeof fileTypes)[number]; // [number] pointedt to index of array
export type DocumentTypes = (typeof documentTypes)[number];
export type ImageTypes = (typeof imageTypes)[number];

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

interface FileListResponse {
  items: FileItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export type CheckedFile = {
  id: number | string;
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
