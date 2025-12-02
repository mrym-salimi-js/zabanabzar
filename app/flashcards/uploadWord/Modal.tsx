"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, useRef } from "react";
import ModalHeader from "./ModalHeader";
import { Plus } from "@/components/Icons";
import ModalContent from "./ModalContent";
import ModalFooter from "@/components/ModalFooter";
import { TriggerBtn } from "@/components/TriggerBtn";
import { useFlashCardStore } from "@/store/uploadFlashCardstore";
import { useUpladeFlashCard } from "@/hooks/api/flashCards";

export default function Modal(): ReactElement {
  // Create ref for hidden btn, for using closing modal after sending data
  const closeRef = useRef<HTMLButtonElement>(null);
  const saveMutation = useUpladeFlashCard();

  const { clearStore, currentWord } = useFlashCardStore();

  // Clear all uploaded file after click on "انصراف" btn
  const handleClearText = () => {
    // Clear saved text in localStorage
    clearStore();
  };

  // Handle events after click on "تایید" btn
  const handleSendData = async () => {
    // Delete some unnessesary items
    const userId = 1;
    delete currentWord.id;
    delete currentWord.audioId;
    // Send Text into server by mutate
    saveMutation.mutate(
      { data: { ...currentWord, userId } },
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
        {/*Upload Btn */}
        <DialogTrigger className="w-full">
          <TriggerBtn icon={Plus} label="افزودن" />
        </DialogTrigger>

        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          {/*Modal header */}
          <ModalHeader />
          {/* Input and texterea box */}
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
