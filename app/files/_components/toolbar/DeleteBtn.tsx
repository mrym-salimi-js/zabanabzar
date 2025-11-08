"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useRef } from "react";
import { Bin } from "@/components/Icons";
import { TriggerBtn } from "@/components/TriggerBtn";
import ModalFooter from "@/components/ModalFooter";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CleanFileType } from "@/app/files/_components/modals/uploadFiles/ModalFooterProcess";
import ModalContent from "@/components/ModalContent";

export function DeleteBtn(): ReactElement {
  const closeRef = useRef<HTMLButtonElement>(null);
  // Delete data from database
  const mutation = useMutation<void, Error, CleanFileType[]>({
    mutationFn: async (files: CleanFileType[]) => {
      const res = await fetch("/api/files", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(files),
      });
      if (!res.ok) throw new Error("خطا در حذف فایل‌ها");
      return res.json();
    },
    onSuccess: () => {
      toast.success("حذف با موفقیت انجام شد");
      // Click on hidden closing btn after sending data
      closeRef.current?.click();
    },
    onError: () => toast.error("حذف ناموفق بود"),
  });
  //Handle enents after click on "انصراف" Btn
  const handleCancel = () => {};
  //Handle enents after click on "تایید" Btn
  const handleConfirm = () => {};
  return (
    <Dialog>
      <form className="w-full">
        {/*Delete Btn */}
        <DialogTrigger className="w-full">
          <TriggerBtn icon={Bin} label="حذف" />
        </DialogTrigger>

        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/*Modal content */}
          <ModalContent
            icon={Bin}
            question="حذف انجام شود؟"
            lightBGColor="bg-[var(--primary-light)]"
            mainColor="text-[var(--primary)]"
          />
          {/*Modal footer */}
          <ModalFooter
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            mutation={mutation}
            closeRef={closeRef}
            confirmBtnBG="bg-[var(--primary)]"
            confirmLabelLoading="در حال حذف"
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
