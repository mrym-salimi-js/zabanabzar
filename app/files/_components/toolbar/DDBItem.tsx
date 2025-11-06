import { ReactElement } from "react";
interface DDBItemProps {
  icon: React.ElementType;
  label: string;
}
export default function DDBItem({
  icon: Icon,
  label,
}: DDBItemProps): ReactElement {
  return (
    <div className="w-full p-2 outline-0  flex hover:bg-gray-100 rounded-md  cursor-pointer items-center justify-end  gap-2 border-0 ">
      <p className=" text-[0.8rem] ">{label}</p>
      <Icon size="size-4" color="black" fill="black" />
    </div>
  );
}
