import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TriggerBtn } from "@/components/TriggerBtn";
import ModalFooter from "@/components/modals/ModalFooter";
import { UseMutationResult } from "@tanstack/react-query";

type GreenConfirmationDialogProps<TData, TError, TVariables> = {
  handleConfirm: () => void;
  handleTriggerClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  label: string;
  question: string;
  icon: React.ElementType;
  mutation: UseMutationResult<TData, TError, TVariables>;
  closeRef: React.RefObject<HTMLButtonElement | null>;
};
export default function GreenConfirmationDialog<TData, TError, TVariables>({
  handleConfirm,
  handleTriggerClick,
  label,
  question,
  icon: Icon,
  mutation,
  closeRef,
}: GreenConfirmationDialogProps<TData, TError, TVariables>) {
  return (
    <Dialog>
      <form className="w-full">
        {/*Delete Btn */}
        <DialogTrigger className="w-full">
          <div onClick={handleTriggerClick} className="w-full">
            <TriggerBtn icon={Icon} label={label} />
          </div>
        </DialogTrigger>

        {/*Download modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/* Content */}
          <div className="w-full h-auto flex flex-col gap-4 items-center py-2">
            <span
              className={`w-auto h-auto p-4 bg-[var(--secondary-light)] dark:bg-[var(--secondary-dark)] rounded-full`}
            >
              <Icon classes={`size-7 text-[var(--secondary)]`} />
            </span>
            <p className="text-[0.9rem] dark:text-white">{question}</p>
          </div>

          {/*Modal footer */}
          <ModalFooter
            handleConfirm={handleConfirm}
            mutation={mutation}
            closeRef={closeRef}
            confirmBtnBG="bg-[var(--secondary)]"
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
