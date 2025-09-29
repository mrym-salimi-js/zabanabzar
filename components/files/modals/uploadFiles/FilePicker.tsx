"use client";

import { useRef, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

export default function FilePicker() {
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={openFileDialog}
        variant="outline"
        className="border-0 bg-gray-200 items-center 
                     dark:bg-[var(--tertiary-dark)] dark:text-white text-[0.8rem] cursor-pointer"
      >
        انتخاب فایل
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />

      {fileName && (
        <p className="text-sm text-gray-700 dark:text-gray-200">{fileName}</p>
      )}
    </div>
  );
}
