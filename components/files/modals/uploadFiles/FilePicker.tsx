"use client";

import { useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import type { AxiosProgressEvent } from "axios";
import { useUploadStore } from "@/store/uploadFileStore";

export default function FilePicker() {
  const { addFiles, updateProgress, updateStatus } = useUploadStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    //Get selected files
    const files = e.target.files as File[] | null;
    if (!files) return;

    //Add new file into state
    addFiles(files);

    // Create formData for each selected files
    Array.from(files).forEach((file, index) => {
      //Add file inti formData
      const formData = new FormData();
      formData.append("file", file);
      // Post file by axios
      axios
        .post("/api/upload", formData, {
          // Set percent for progress of file
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded / (progressEvent.total || 1)) * 100
            );

            // Update progress percent of each file in state
            updateProgress(index, percent);
          },
        })
        .then((res) => {
          // Set done status for each file after get it link from storage (s3)
          updateStatus(index, "done", res.data.fileUrl);
        })
        .catch(() => {
          // Set error status for each file
          updateStatus(index, "error", "undefined");
        });
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
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
