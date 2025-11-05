import { deleteAllFilesFromIndexedDB } from "@/lib/indexedDB";
import { deleteFile } from "@/services/deleteFile";
import { useUploadStore } from "@/store/uploadFileStore";
import React, { ReactElement, useRef } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import ModalFooter from "@/components/ModalFooter";

export type CleanFileType = {
  name: string;
  size: number;
  url: string | undefined;
  ext: string;
  userId: number;
};

export default function ModalFooterProcess(): ReactElement {
  // Create ref for hidden btn, for using closing modal after sending data
  const closeRef = useRef<HTMLButtonElement>(null);
  const { files, clearFiles } = useUploadStore();

  // Send data mutation
  const mutation = useMutation<void, Error, CleanFileType[]>({
    mutationFn: async (files: CleanFileType[]) => {
      const res = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(files),
      });
      if (!res.ok) throw new Error("خطا در ذخیره ");
      return res.json();
    },
    onSuccess: () => {
      clearFiles();
      deleteAllFilesFromIndexedDB();
      toast.success("ذخیره سازی با موفقیت انجام شد");
      // Click on hidden closing btn after sending data
      closeRef.current?.click();
    },
    onError: () => toast.error("ارسال ناموفق بود"),
  });

  // Clear all uploaded file after click on "انصراف" btn
  const handleClearFiles = () => {
    if (files.length === 0) return;
    files.forEach(async (f) => {
      await deleteFile(f.status, f.id, f.url);
    });
  };

  // Handle events after click on "تایید" btn
  const handleSendData = async () => {
    // Check done status of all files
    const allDone = files.every((f) => f.status === "done");
    if (!allDone) {
      toast.error("خطا! اپلود را کامل نیست");
      return;
    }

    // Fix every file structure for drizzle schema
    const cleanFiles = files.map((f) => {
      const parts = f.name.split(".");
      const ext = parts.pop() || "";
      const nameWithoutExt = parts.join(".");

      return {
        name: nameWithoutExt,
        size: f.size,
        url: f.url,
        ext,
        userId: 1,
      };
    });

    if (cleanFiles.length === 0) return;
    // Send cleanFiles into server
    mutation.mutate(cleanFiles);
  };
  return (
    <ModalFooter
      handleCancel={handleClearFiles}
      handleConfirm={handleSendData}
      mutation={mutation}
      closeRef={closeRef}
      confirmBtnBG="bg-[var(--secondary)]"
      confirmLabelLoading="در حال ارسال"
    />
  );
}
