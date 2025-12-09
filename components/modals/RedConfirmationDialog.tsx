import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TriggerBtn } from "@/components/TriggerBtn";
import ModalFooter from "@/components/modals/ModalFooter";
import { UseMutationResult } from "@tanstack/react-query";

type RedConfirmationDialogProps<TData, TError, TVariables> = {
  handleConfirm: () => void;
  handleTriggerClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  label: string;
  question: string;
  icon: React.ElementType;
  mutation: UseMutationResult<TData, TError, TVariables>;
  closeRef: React.RefObject<HTMLButtonElement | null>;
};

export default function RedConfirmationDialog<TData, TError, TVariables>({
  handleConfirm,
  handleTriggerClick,
  label,
  question,
  icon: Icon,
  mutation,
  closeRef,
}: RedConfirmationDialogProps<TData, TError, TVariables>) {
  return (
    <Dialog>
      <form className="w-full">
        {/*Trigger Btn */}
        <DialogTrigger className="w-full">
          <div onClick={(e) => handleTriggerClick(e)} className="w-full">
            <TriggerBtn icon={Icon} label={label} />
          </div>
        </DialogTrigger>

        {/*Modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/* Content */}
          <div className="w-full h-auto flex flex-col gap-4 items-center py-2">
            <span
              className={`w-auto h-auto p-4 bg-[var(--primary-light)] dark:bg-[var(--primary-dark)] rounded-full`}
            >
              <Icon classes={`size-7 text-[var(--primary)]`} />
            </span>
            <p className="text-[0.9rem] dark:text-white">{question}</p>
          </div>

          {/*Footer */}
          <ModalFooter
            handleConfirm={handleConfirm}
            mutation={mutation}
            closeRef={closeRef}
            confirmBtnBG="bg-[var(--primary)]"
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
