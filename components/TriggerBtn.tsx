import { ReactElement } from "react";
interface IconTextBtnProps {
  icon: React.ElementType;
  label: string;
}

export function TriggerBtn({
  icon: Icon,
  label,
}: IconTextBtnProps): ReactElement {
  return (
    <div className="w-auto h-11 rounded-xl cursor-pointer p-3 flex items-center justify-end border bg-white  gap-1.5 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]">
      <p className=" text-[0.8rem] dark:text-white   text-nowrap">{label}</p>
      <Icon classes="size-4 !hover:text-[var(--primary)] dark:text-[var(--primary)]" />
    </div>
  );
}
