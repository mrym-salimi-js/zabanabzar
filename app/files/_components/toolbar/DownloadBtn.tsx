"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useRef } from "react";
import { TriggerBtn } from "@/components/TriggerBtn";
import ModalFooter from "@/components/ModalFooter";
import toast from "react-hot-toast";
import ModalContent from "@/components/ModalContent";
import { Download } from "@/components/Icons";
import { useFileCheckStore } from "@/store/fileCheckStore";
import { useDownloadFile } from "@/hooks/api/files";

export function DownloadBtn(): ReactElement {
  const selectedIds = useFileCheckStore((state) => state.selectedUrls);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Download files from storage
  const downloadMutation = useDownloadFile();

  // Handle trigger click
  const handleTriggerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedIds?.length === 0) {
      e.preventDefault();
      toast.error("فایلی انتخاب نشده");
    }
  };
  //Handle enents after click on "انصراف" Btn
  const handleCancel = () => {};
  //Handle enents after click on "تایید" Btn
  const handleConfirm = () => {};
  return (
    <Dialog>
      <form className="w-full">
        {/*Delete Btn */}
        <DialogTrigger className="w-full">
          <div onClick={handleTriggerClick} className="w-full">
            <TriggerBtn icon={Download} label="دانلود" />
          </div>
        </DialogTrigger>

        {/*Download modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/*Modal content */}
          <ModalContent
            icon={Download}
            question="دانلود انجام شود؟"
            lightBGColor="bg-[var(--secondary-light)]"
            darkBGcolor="bg-[var(--secondary-dark)]"
            mainColor="text-[var(--secondary)]"
          />
          {/*Modal footer */}
          <ModalFooter
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            mutation={downloadMutation}
            closeRef={closeRef}
            confirmBtnBG="bg-[var(--secondary)]"
            confirmLabelLoading="در حال دانلود"
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
