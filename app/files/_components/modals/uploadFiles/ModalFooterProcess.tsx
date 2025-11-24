import { deleteFile } from "@/utils/files/deleteFile";
import { useUploadStore } from "@/store/uploadFileStore";
import { ReactElement, useRef } from "react";
import toast from "react-hot-toast";
import ModalFooter from "@/components/ModalFooter";
import { useSaveFileToDB } from "@/hooks/api/files";
import { FileTypes } from "@/types/file";

export default function ModalFooterProcess(): ReactElement {
  // Create ref for hidden btn, for using closing modal after sending data
  const closeRef = useRef<HTMLButtonElement>(null);
  const { files } = useUploadStore();
  const saveMutation = useSaveFileToDB();

  // Clear all uploaded file after click on "انصراف" btn
  const handleClearFiles = () => {
    if (files.length === 0) return;
    files?.forEach(async (f) => {
      if (!f) return;
      await deleteFile(f.status, f.id, { id: Number(f.id), url: f.url });
    });
  };

  // Handle events after click on "تایید" btn
  const handleSendData = async () => {
    // Check done status of all files
    const allDone = files.every((f) => f.status === "done");
    if (!allDone) {
      toast.error("خطا! اپلود فایل ها کامل نشده");
      return;
    }

    // Fix every file structure for drizzle schema
    const cleanFiles = files.map((f) => {
      const parts = f.name.split(".");
      const ext = parts.pop() || "";
      const nameWithoutExt = parts.join(".");
      return {
        type: f.type as FileTypes,
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
    <ModalFooter
      handleCancel={handleClearFiles}
      handleConfirm={handleSendData}
      mutation={saveMutation}
      closeRef={closeRef}
      confirmBtnBG="bg-[var(--secondary)]"
      confirmLabelLoading="در حال ارسال"
    />
  );
}
