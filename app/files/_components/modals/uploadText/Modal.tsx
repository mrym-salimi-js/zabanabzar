"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useRef } from "react";
import ModalHeader from "./ModalHeader";
import DDBItem from "@/app/files/_components/toolbar/DDBItem";
import { Pencil } from "@/components/Icons";
import ModalContent from "./ModalContent";
import ModalFooter from "@/components/ModalFooter";
import toast from "react-hot-toast";
import { useSaveFileToDB } from "@/hooks/api/files";
import { useUploadTextStore } from "@/store/uploadTextStore";

export default function Modal(): ReactElement {
  // Create ref for hidden btn, for using closing modal after sending data
  const closeRef = useRef<HTMLButtonElement>(null);
  const saveMutation = useSaveFileToDB();

  const { clearTextStorage, text } = useUploadTextStore();

  // Clear all uploaded file after click on "انصراف" btn
  const handleClearText = () => {
    // Clear saved text in localStorage
    clearTextStorage();
  };

  // Handle events after click on "تایید" btn
  const handleSendData = async () => {
    // Check saved text in loacalStorage
    if (!text || text?.content === "") {
      toast.error("متنی وجود ندارد");
      return;
    }

    // Create text obj
    const currentUserId = 1; // از session یا auth context بگیر

    const textUpload = {
      type: text.type,
      textContent: text.content,
      name: text.title,
      userId: currentUserId,
    };

    // Send Text into server by mutate
    saveMutation.mutate([textUpload], {
      onSuccess: () => {
        closeRef.current?.click();
      },
    });
  };
  return (
    <Dialog>
      <form className="w-full">
        {/*Upload Btn */}
        <DialogTrigger className="w-full">
          <DDBItem icon={Pencil} label="متن" />
        </DialogTrigger>

        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          {/*Modal header */}
          <ModalHeader />
          {/* Text box */}
          <ModalContent />
          {/* Modal footer */}
          <ModalFooter
            closeRef={closeRef}
            handleCancel={handleClearText}
            handleConfirm={handleSendData}
            mutation={saveMutation}
            confirmBtnBG="bg-[var(--secondary)]"
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
