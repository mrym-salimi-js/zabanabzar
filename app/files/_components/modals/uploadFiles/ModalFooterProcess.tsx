import { deleteFile } from "@/utils/files/deleteFile";
import { useUploadStore } from "@/store/uploadFileStore";
import React, { ReactElement, useRef } from "react";
import toast from "react-hot-toast";
import ModalFooter from "@/components/ModalFooter";
import { useSaveFileToDB } from "@/hooks/api/files";
import { CleanFileType } from "@/types/file";

export default function ModalFooterProcess(): ReactElement {
  // Create ref for hidden btn, for using closing modal after sending data
  const closeRef = useRef<HTMLButtonElement>(null);
  const { files } = useUploadStore();
  const saveMutation = useSaveFileToDB();

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
    saveMutation.mutate(cleanFiles, {
      onSuccess: () => {
        closeRef.current?.click();
      },
    });
  };
  return (
    <ModalFooter<CleanFileType[]>
      handleCancel={handleClearFiles}
      handleConfirm={handleSendData}
      mutation={saveMutation}
      closeRef={closeRef}
      confirmBtnBG="bg-[var(--secondary)]"
      confirmLabelLoading="در حال ارسال"
    />
  );
}
