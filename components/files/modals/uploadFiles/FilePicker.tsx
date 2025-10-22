"use client";

import { useRef, ChangeEvent, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { uploadReducer } from "@/reducers/uploadReducer";
import axios from "axios";
import type { AxiosProgressEvent } from "axios";

export default function FilePicker() {
  const [filesState, dispatch] = useReducer(uploadReducer, []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    //Get selected files
    const files = e.target.files as FileList;
    if (!files) return;

    // Set mood into  "ADD_FILES"
    dispatch({ type: "ADD_FILES", files: Array.from(files) });

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

            // Update percent of each file in state
            dispatch({ type: "UPDATE_PROGRESS", index, progress: percent });
          },
        })
        .then((res) => {
          // Set "done" status for every file after get it link from storage (s3)
          dispatch({
            type: "SET_STATUS",
            index,
            status: "done",
            url: res.data.fileUrl,
          });
        })
        .catch(() => {
          // set "error" status if uoploading failed
          dispatch({ type: "SET_STATUS", index, status: "error" });
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
