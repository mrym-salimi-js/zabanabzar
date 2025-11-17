export interface FileItem {
  id: number;
  name: string;
  size: number;
  exText: string | null;
  ext: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  userId: number;
}

export type FileListResponse = FileItem[];

export type CleanFileType = {
  name: string;
  size: number;
  url: string | undefined;
  ext: string;
  userId: number;
};
