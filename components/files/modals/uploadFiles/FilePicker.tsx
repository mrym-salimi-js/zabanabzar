"use client";

import { useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { useUploadStore } from "@/store/uploadFileStore";
import { saveFileToIndexedDB } from "@/lib/indexedDB";
import { uploadFile } from "@/services/uploadFile";

export default function FilePicker() {
  const { addFiles } = useUploadStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    //Get selected files
    const files = e.target.files as File[] | null;
    if (!files) return;

    // Create formData for each selected files
    Array.from(files).forEach(async (file) => {
      const id = crypto.randomUUID();
      // Save file in indexedDB
      await saveFileToIndexedDB(id, file);
      //Add new file into state
      addFiles({
        id,
        name: file.name,
        size: file.size,
        status: "uploading",
        progress: 0,
        url: undefined,
      });

      // Start file upload by getting from indexedDB
      await uploadFile(id);
    });
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
        className="hidden"
      />
    </div>
  );
}
