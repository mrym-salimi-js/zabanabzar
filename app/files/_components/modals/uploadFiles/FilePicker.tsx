"use client";

import { useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { processAndUploadFiles } from "@/services/processAndUploadFiles";

export default function FilePicker() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    //Get selected files

    const files = e.target.files as File[] | null;

    if (!files) return;

    // Create formData for each selected files
    processAndUploadFiles(files);

    e.target.value = "";
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
        multiple
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept=".txt,.pdf,.docx,.jpg,.jpeg,.png"
        className="hidden"
      />
    </div>
  );
}
