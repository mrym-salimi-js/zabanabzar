"use client";

import { useFileCheckStore } from "@/store/fileCheckStore";
import { useDownloadFile } from "@/hooks/api/files";
import GreenConfirmationDialog from "@/components/modals/GreenConfirmationDialog";
import { ReactElement, useRef } from "react";
import toast from "react-hot-toast";
import { Download } from "@/components/Icons";

export function DownloadBtn(): ReactElement {
  const checkedFiles = useFileCheckStore((state) => state.CheckedFiles);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Download files from storage
  const downloadMutation = useDownloadFile();

  // Handle trigger click
  const handleTriggerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (checkedFiles?.length === 0) {
      e.preventDefault();
      toast.error("فایلی انتخاب نشده");
    }
  };

  //Handle enents after click on "تایید" Btn
  const handleConfirm = () => {
    downloadMutation.mutate(checkedFiles, {
      onSuccess: () => {
        closeRef.current?.click();
      },
    });
  };
  return (
    <GreenConfirmationDialog
      handleConfirm={handleConfirm}
      handleTriggerClick={handleTriggerClick}
      icon={Download}
      label="دانلود"
      question="دانلود انجام شود؟"
      mutation={downloadMutation}
      closeRef={closeRef}
    />
  );
}
