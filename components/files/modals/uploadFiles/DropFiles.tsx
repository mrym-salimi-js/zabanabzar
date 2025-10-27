import { Upload } from "@/components/icon";
import React, {
  Dispatch,
  DragEvent,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import FilePicker from "./FilePicker";
import { processAndUploadFiles } from "@/services/processAndUploadFiles";
type DropFiles = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function DropFiles({
  files,
  setFiles,
}: DropFiles): ReactElement {
  const [isOver, setIsOver] = useState<boolean>(false);

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);

    const files = e.dataTransfer.files;
    if (!files) return;

    // Create formData for each selected files
    processAndUploadFiles(files);

    if (files) setFiles((prev: File[]) => [...prev, ...files]);
  };
  const handleOnDgragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };
  const handleOnDgragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
  };
  useEffect(() => {
    const formData = new FormData();
    files.forEach((f) => {
      formData.append("name", f.name);
      formData.append("size", f.size.toString()); // یادت باشه بعدا تایپ این فیلد توی دیتابیس رو درست کنی
      formData.append("type", f.type);
      formData.append("url", "");
      formData.append("originalText", "");
      formData.append("translatedText", "");
      formData.append("subtitleFile", "");
    });
  }, [files]);

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
