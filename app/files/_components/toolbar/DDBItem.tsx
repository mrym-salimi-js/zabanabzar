import { ReactElement } from "react";
interface DDBItemProps {
  icon: React.ElementType;
  label: string;
  handleAction: () => void;
}
export default function DDBItem({
  icon: Icon,
  label,
  handleAction,
}: DDBItemProps): ReactElement {
  return (
    <div
      onClick={handleAction}
      className="w-full p-2 outline-0  flex hover:bg-[var(--primary-light)] hover:text-[var(--primary)] dark:text-white dark:hover:bg-[var(--primary-dark)] rounded-md  cursor-pointer items-center justify-end  gap-2 border-0 "
    >
      <p className=" text-[0.8rem] ">{label}</p>
      <Icon classes="size-4 !hover:text-[var(--primary)]" />
    </div>
  );
}
