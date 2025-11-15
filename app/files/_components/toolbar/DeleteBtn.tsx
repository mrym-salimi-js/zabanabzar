"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useRef } from "react";
import { Bin } from "@/components/Icons";
import { TriggerBtn } from "@/components/TriggerBtn";
import ModalFooter from "@/components/ModalFooter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ModalContent from "@/components/ModalContent";
import { useFileCheckStore } from "@/store/fileCheckStore";
import { deleteFromStorage } from "@/services/deleteFromStorage";

export function DeleteBtn(): ReactElement {
  const selectedUrls = useFileCheckStore((state) => state.selectedUrls);
  const queryClient = useQueryClient();
  const closeRef = useRef<HTMLButtonElement>(null);
  // Delete data from database
  const mutation = useMutation<void, Error, string[]>({
    mutationFn: async (files: string[]) => {
      const resDB = await fetch("/api/files", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(files),
      });
      // Delete file from storage (s3)
      await deleteFromStorage(files);
      return resDB.json();
    },
    onSuccess: () => {
      toast.success("حذف با موفقیت انجام شد");
      // Update files list
      queryClient.invalidateQueries({ queryKey: ["files"] });
      // Click on hidden closing btn after sending data
      closeRef.current?.click();
    },
    onError: () => toast.error("حذف ناموفق بود"),
  });

  // Handle trigger click
  const handleTriggerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedUrls?.length === 0) {
      e.preventDefault();
      toast.error("فایلی انتخاب نشده");
    }
  };
  //Handle enents after click on "انصراف" Btn
  const handleCancel = () => {};
  //Handle enents after click on "تایید" Btn
  const handleConfirm = () => {
    mutation.mutate(selectedUrls);
  };
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
