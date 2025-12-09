"use client";

import { ReactElement, useRef } from "react";
import toast from "react-hot-toast";
import { Tick } from "@/components/Icons";
import { useEditExtractionText } from "@/hooks/api/files";
import GreenConfirmationDialog from "@/components/modals/GreenConfirmationDialog";

type UpdateExTextProps = {
  prevText: string;
  nextText: string | undefined;
  fileId: number;
};

export function UpdateExTextBtn({
  prevText,
  nextText,
  fileId,
}: UpdateExTextProps): ReactElement {
  const closeRef = useRef<HTMLButtonElement>(null);
  // Download files from storage
  const editExTextMutation = useEditExtractionText();

  // Handle trigger click
  const handleTriggerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check changes of text
    if (prevText === nextText) {
      e.preventDefault();
      toast.error("تغییری در متن ایجاد نشده");
    }
  };

  //Handle enents after click on "تایید" Btn
  const handleConfirm = () => {
    editExTextMutation.mutate(
      { id: fileId, text: nextText },
      {
        onSuccess: () => {
          closeRef.current?.click();
        },
      }
    );
  };

  return (
    <GreenConfirmationDialog
      handleConfirm={handleConfirm}
      handleTriggerClick={handleTriggerClick}
      icon={Tick}
      label="ذخیره"
      question="ویرایش انجام شود؟"
      mutation={editExTextMutation}
      closeRef={closeRef}
    />
  );
}
