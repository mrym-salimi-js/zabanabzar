import { ReactElement } from "react";
import { Button } from "./ui/button";
interface IconTextBtnProps {
  icon: React.ElementType;
  label: string;
}

export function TriggerBtn({
  icon: Icon,
  label,
}: IconTextBtnProps): ReactElement {
  return (
    <div className="w-auto h-11 rounded-xl cursor-pointer p-3 flex items-center justify-end border bg-white  gap-1.5">
      <p className=" text-[0.8rem] dark:text-white text-nowrap">{label}</p>
      <Icon size="size-4" color="black" />
    </div>
  );
}
