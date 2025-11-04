import { ReactElement } from "react";
import { Button } from "./ui/button";
interface IconTextBtnProps {
  icon: React.ElementType;
  label: string;
}

export default function IconTextBtn({
  icon: Icon,
  label,
}: IconTextBtnProps): ReactElement {
  return (
    <Button
      variant="outline"
      className="h-11 rounded-xl flex items-center gap-1"
    >
      <p className=" text-[0.8rem] dark:text-white">{label}</p>
      <Icon size="size-4" color="black" />
    </Button>
  );
}
