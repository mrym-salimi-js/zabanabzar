"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement, RefObject } from "react";
import ModalFooter from "@/components/ModalFooter";
import ModalHeader from "./ModalHeader";
import ModalContent from "./ModalContent";
import { UseMutationResult } from "@tanstack/react-query";
import { FlashCardItem } from "@/types/flashcard";

type ModalProps<TData = unknown, TError = Error, TVariables = unknown> = {
  handleConfirm: () => void;
  flashCard?: FlashCardItem;
  triggerBtn?: React.ReactNode;
  headerDesc: string;
  headerTitle: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  mutation: UseMutationResult<TData, TError, TVariables>;
};

export default function Modal<TData, TError, TVariables>({
  handleConfirm,
  flashCard,
  triggerBtn,
  headerDesc,
  headerTitle,
  closeRef,
  mutation,
}: ModalProps<TData, TError, TVariables>): ReactElement {
  // // Clear all uploaded file after click on "انصراف" btn
  // const handleClearText = () => {
  //   // Clear saved text in localStorage
  //   clearStore();
  // };

  return (
    <Dialog>
      <form className="w-full">
        {/*Upload Btn */}
        <DialogTrigger className="w-full ">{triggerBtn}</DialogTrigger>

        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          {/*Modal header */}
          <ModalHeader description={headerDesc} title={headerTitle} />
          {/* Input and texterea box */}
          <ModalContent flashCard={flashCard} />
          {/* Modal footer */}
          <ModalFooter
            closeRef={closeRef}
            // handleCancel={handleClearText}
            handleConfirm={handleConfirm}
            mutation={mutation}
            confirmBtnBG="bg-[var(--secondary)]"
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
