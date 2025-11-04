"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useRef } from "react";
import { Bin } from "@/components/icon";
import DropDownBtn from "./DropDownBtn";
import ModalFooter from "./ModalFooter";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CleanFileType } from "./files/modals/uploadFiles/ModalFooterProcess";

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
          <DropDownBtn icon={Bin} label="حذف" />
        </DialogTrigger>

        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/*Modal content */}
          <div className="w-full h-auto flex flex-col gap-4 items-center py-2">
            <span className="w-auto h-auto p-4 bg-[var(--primary-light)] rounded-full">
              <Bin color="var(--primary)" size="size-7" />
            </span>
            <p className="text-[0.9rem]">حذف انجام شود؟</p>
          </div>
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
