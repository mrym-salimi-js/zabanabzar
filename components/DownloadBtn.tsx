"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useRef } from "react";
import { Bin, Download } from "@/components/icon";
import DropDownBtn from "./DropDownBtn";
import ModalFooter from "./ModalFooter";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CleanFileType } from "./files/modals/uploadFiles/ModalFooterProcess";

export function DownloadBtn(): ReactElement {
  const closeRef = useRef<HTMLButtonElement>(null);
  // Delete data from database
  const mutation = useMutation<void, Error, CleanFileType[]>({
    mutationFn: async (files: CleanFileType[]) => {
      const res = await fetch("/api/files", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(files),
      });
      if (!res.ok) throw new Error("خطا در دانلود");
      return res.json();
    },
    onSuccess: () => {
      toast.success("دانلود با موفقیت انجام شد");
      // Click on hidden closing btn after sending data
      closeRef.current?.click();
    },
    onError: () => toast.error("دانلود ناموفق بود"),
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
          <DropDownBtn icon={Download} label="دانلود" />
        </DialogTrigger>

        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/*Modal content */}
          <div className="w-full h-auto flex flex-col gap-4 items-center py-2">
            <span className="w-auto h-auto p-4 bg-[var(--secondary-light)] rounded-full">
              <Download color="var(--secondary)" size="size-7" />
            </span>
            <p className="text-[0.9rem]">دانلود انجام شود؟</p>
          </div>
          {/*Modal footer */}
          <ModalFooter
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            mutation={mutation}
            closeRef={closeRef}
            confirmBtnBG="bg-[var(--secondary)]"
            confirmLabelLoading="در حال دانلود"
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
