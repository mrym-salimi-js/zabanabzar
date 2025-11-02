import { Upload } from "@/components/icon";
import React, { DragEvent, ReactElement, useState } from "react";
import FilePicker from "./FilePicker";
import { processAndUploadFiles } from "@/services/processAndUploadFiles";

export default function DropFiles(): ReactElement {
  const [isOver, setIsOver] = useState<boolean>(false);

  // Handle onDrop events
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);

    const files = e.dataTransfer.files;
    if (!files) return;

    // Create formData for each selected files
    processAndUploadFiles(files);
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
      <Upload size="size-9" color="#000000" fill="var(--primary)" />
      <p className=" text-[0.8rem] dark:text-white">بکش و رها کن یا</p>
      <FilePicker />
    </div>
  );
}
