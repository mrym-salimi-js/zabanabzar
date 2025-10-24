import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useUploadStore } from "@/store/uploadFileStore";
import React, { ReactElement } from "react";

export default function ModalFooter(): ReactElement {
  const { clearFiles } = useUploadStore();
  const handleClearFiles = () => {
    clearFiles();
  };
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button
          onClick={handleClearFiles}
          variant="outline"
          className="border-0 bg-gray-200 items-center dark:bg-[var(--tertiary-dark)] dark:text-white"
        >
          انصراف
        </Button>
      </DialogClose>
      <Button
        variant="outline"
        className="border-0 bg-[var(--secondary)] items-center text-white"
      >
        تایید
      </Button>
    </DialogFooter>
  );
}
