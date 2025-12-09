"use client";

import { ReactElement, useRef } from "react";
import toast from "react-hot-toast";
import { useFileCheckStore } from "@/store/fileCheckStore";
import { useDeleteFiles } from "@/hooks/api/files";
import RedConfirmationDialog from "@/components/modals/RedConfirmationDialog";
import { Bin } from "@/components/Icons";

export function DeleteBtn(): ReactElement {
  const checkedFiles = useFileCheckStore((state) => state.CheckedFiles);
  const closeRef = useRef<HTMLButtonElement>(null);

  const deleteMutation = useDeleteFiles();

  // Handle delete file
  const handleConfirm = () => {
    deleteMutation.mutate(checkedFiles, {
      onSuccess: () => {
        closeRef.current?.click();
      },
    });
  };

  // Handle trigger click
  const handleTriggerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (checkedFiles?.length === 0) {
      e.preventDefault();
      toast.error("فایلی انتخاب نشده");
    }
  };

  return (
    <RedConfirmationDialog
      handleConfirm={handleConfirm}
      handleTriggerClick={handleTriggerClick}
      icon={Bin}
      label="حذف"
      question="حذف انجام شود؟"
      closeRef={closeRef}
      mutation={deleteMutation}
    />
  );
}
