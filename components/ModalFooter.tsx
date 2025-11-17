import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import React, { ReactElement } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type ModalFooterProps<TVariables> = {
  handleCancel: () => void;
  handleConfirm: () => void;
  mutation: UseMutationResult<void, Error, TVariables>;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  confirmBtnBG: string;
  confirmLabelLoading: string;
};

export default function ModalFooter<TVariables>({
  handleCancel,
  handleConfirm,
  mutation,
  closeRef,
  confirmBtnBG,
  confirmLabelLoading,
}: ModalFooterProps<TVariables>): ReactElement {
  // Create ref for hidden btn, for using closing modal after sending data

  return (
    <>
      <DialogClose asChild>
        <button ref={closeRef} className="hidden"></button>
      </DialogClose>

      <DialogFooter className="md:justify-between">
        <DialogClose asChild>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="sm:w-[50%] border-0 bg-gray-200 items-center dark:bg-[var(--tertiary-dark)] dark:text-white"
          >
            انصراف
          </Button>
        </DialogClose>
        <Button
          onClick={handleConfirm}
          variant="outline"
          className={`sm:w-[50%] border-0  items-center text-white ${confirmBtnBG}`}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {confirmLabelLoading}
            </>
          ) : (
            "تایید"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
