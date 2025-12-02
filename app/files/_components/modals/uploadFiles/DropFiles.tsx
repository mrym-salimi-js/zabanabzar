import { Upload } from "@/components/Icons";
import React, { DragEvent, ReactElement, useState } from "react";
import FilePicker from "./FilePicker";
import { useUploadStore } from "@/store/uploadFileStore";
import { saveFileToIndexedDB } from "@/lib/indexedDB";
import { FileTypes } from "@/types/file";
import { imageTypes } from "@/constants/imageTypes";
import { documentTypes } from "@/constants/documentTypes";
import { useUploadFile } from "@/hooks/api/uploadFileToStorage";

export default function DropFiles(): ReactElement {
  const [isOver, setIsOver] = useState<boolean>(false);
  const uploadMutation = useUploadFile();

  const { addFiles } = useUploadStore();

  // Handle onDrop events
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);

    const files = e.dataTransfer.files;
    if (!files) return;

    // Create formData for each selected files

    Array.from(files).forEach(async (file) => {
      const id = crypto.randomUUID();

      await saveFileToIndexedDB(id, file);
      const parts = file.name.split(".");
      const ext = parts.pop();
      let type: FileTypes = "document";
      if (!ext) return;
      if (imageTypes.includes(ext)) {
        type = "image";
      }
      if (documentTypes.includes(ext)) {
        type = "document";
      }

      // Add other types ???

      addFiles({
        id,
        name: file.name,
        size: file.size,
        status: "uploading",
        progress: 0,
        url: undefined,
        type: type,
      });

      uploadMutation.mutate(id);
    });
  };

  // Handle onDragOver events
  const handleOnDgragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  // Handle onDragLeave events
  const handleOnDgragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
  };

  return (
    <div
      onDragOver={handleOnDgragOver}
      onDragLeave={handleOnDgragLeave}
      onDrop={handleOnDrop}
      className={`w-full h-38 flex flex-col items-center justify-center gap-2 rounded-[12px] border-[2px] border-dashed  ${
        isOver ? `!border-[var(--primary)]/50` : `!border-[var(--primary)]`
      }`}
    >
      <Upload classes="size-8 text-[var(--primary)]" />
      <p className=" text-[0.8rem] dark:text-white">بکش و رها کن یا</p>
      <FilePicker />
    </div>
  );
}
