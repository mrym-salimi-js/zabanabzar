"use client";

import { useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { useUploadStore } from "@/store/uploadFileStore";
import { saveFileToIndexedDB } from "@/lib/indexedDB";
import { imageTypes } from "@/constants/imageTypes";
import { FileTypes } from "@/types/file";
import { documentTypes } from "@/constants/documentTypes";
import { useUploadFile } from "@/hooks/api/uploadFileToStorage";

export default function FilePicker() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadFile();

  const { addFiles } = useUploadStore();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    //Get selected files

    const files = e.target.files as File[] | null;

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
      } else if (documentTypes.includes(ext)) {
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
