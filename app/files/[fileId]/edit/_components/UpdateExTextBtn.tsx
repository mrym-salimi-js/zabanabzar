"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useRef } from "react";
import { TriggerBtn } from "@/components/TriggerBtn";
import ModalFooter from "@/components/ModalFooter";
import toast from "react-hot-toast";
import ModalContent from "@/components/ModalContent";
import { Tick } from "@/components/Icons";
import { EditeExTextMutation, useEditExtractionText } from "@/hooks/api/files";

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
    console.log(prevText, nextText);
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
    <Dialog>
      <form className="w-full">
        {/*Delete Btn */}
        <DialogTrigger className="w-full">
          <div onClick={handleTriggerClick} className="w-full">
            <TriggerBtn icon={Tick} label="ذخیره" />
          </div>
        </DialogTrigger>

        {/*Download modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/*Modal content */}
          <ModalContent
            icon={Tick}
            question="تغییرات ذخیره شوند؟"
            lightBGColor="bg-[var(--secondary-light)]"
            darkBGcolor="bg-[var(--secondary-dark)]"
            mainColor="text-[var(--secondary)]"
          />
          {/*Modal footer */}
          <ModalFooter<EditeExTextMutation>
            handleConfirm={handleConfirm}
            mutation={editExTextMutation}
            closeRef={closeRef}
            confirmBtnBG="bg-[var(--secondary)]"
            confirmLabelLoading="در حال ذخیره"
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
