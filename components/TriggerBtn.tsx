import { ReactElement } from "react";
import { Button } from "./ui/button";
interface IconTextBtnProps {
  icon: React.ElementType;
  label: string;
}

export default function TriggerBtn({
  icon: Icon,
  label,
}: IconTextBtnProps): ReactElement {
  return (
    <Button
      variant="outline"
      type="button"
      className="w-auto h-11 rounded-xl p-2 flex items-center justify-end gap-1.5"
    >
      <p className=" text-[0.8rem] dark:text-white">{label}</p>
      <Icon size="size-4" color="black" />
    </Button>
  );
}
