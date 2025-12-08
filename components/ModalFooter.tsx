import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import React, { ReactElement } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import ThreePointsLoading from "./ThreePointsLoading";

type ModalFooterProps<TData, TError, TVariables> = {
  handleCancel?: () => void;
  handleConfirm: () => void;
  mutation: UseMutationResult<TData, TError, TVariables>;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  confirmBtnBG: string;
};

export default function ModalFooter<TData, TError, TVariables>({
  handleCancel,
  handleConfirm,
  mutation,
  closeRef,
  confirmBtnBG,
}: ModalFooterProps<TData, TError, TVariables>): ReactElement {
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
          className={`sm:w-[50%] border-0 items-center text-white ${confirmBtnBG}`}
        >
          {mutation.isPending ? (
            <ThreePointsLoading circleColor="bg-white" />
          ) : (
            "تایید"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
