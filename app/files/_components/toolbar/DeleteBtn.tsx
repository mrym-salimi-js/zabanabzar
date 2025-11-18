"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useRef } from "react";
import { Bin } from "@/components/Icons";
import { TriggerBtn } from "@/components/TriggerBtn";
import ModalFooter from "@/components/ModalFooter";
import toast from "react-hot-toast";
import ModalContent from "@/components/ModalContent";
import { useFileCheckStore } from "@/store/fileCheckStore";
import { useDeleteFiles } from "@/hooks/api/files";

export function DeleteBtn(): ReactElement {
  const selectedUrls = useFileCheckStore((state) => state.selectedUrls);
  const closeRef = useRef<HTMLButtonElement>(null);

  const deleteMutation = useDeleteFiles();

  // Handle delete file
  const handleConfirm = () => {
    deleteMutation.mutate(selectedUrls, {
      onSuccess: () => {
        closeRef.current?.click();
      },
    });
  };

  // Handle trigger click
  const handleTriggerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedUrls?.length === 0) {
      e.preventDefault();
      toast.error("فایلی انتخاب نشده");
    }
  };

  // Handle cancle
  const handleCancel = () => {};

  return (
    <Dialog>
      <form className="w-full">
        {/*Delete Btn */}
        <DialogTrigger className="w-full">
          <div onClick={(e) => handleTriggerClick(e)} className="w-full">
            <TriggerBtn icon={Bin} label="حذف" />
          </div>
        </DialogTrigger>

        {/*Delete modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/*Modal content */}
          <ModalContent
            icon={Bin}
            question="حذف انجام شود؟"
            lightBGColor="bg-[var(--primary-light)]"
            darkBGcolor="bg-[var(--primary-dark)]"
            mainColor="text-[var(--primary)]"
          />
          {/*Modal footer */}
          <ModalFooter<string[]>
            handleConfirm={handleConfirm}
            mutation={deleteMutation}
            closeRef={closeRef}
            confirmBtnBG="bg-[var(--primary)]"
            confirmLabelLoading="در حال حذف"
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
