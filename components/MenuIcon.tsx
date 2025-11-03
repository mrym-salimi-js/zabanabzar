import { ReactElement } from "react";

export function MenuIcon(): ReactElement {
  return (
    <div className="w-6 h-auto flex flex-col gap-1 cursor-pointer hover:opacity-[0.7] items-end">
      <span className="w-full h-[3px] bg-[var(--fourth)] dark:bg-[var(--tertiary)] rounded-full"></span>
      <span className="w-full h-[3px] bg-[var(--fourth)] dark:bg-[var(--tertiary)] rounded-full"></span>
      <span className="w-2/3 h-[3px] bg-[var(--fourth)] dark:bg-[var(--tertiary)] rounded-full"></span>
    </div>
  );
}
