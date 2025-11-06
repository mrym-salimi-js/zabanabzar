import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal } from "@/app/files/_components/modals/uploadFiles/Modal";
import { Pencil, Plus } from "@/components/Icons";
import DDBItem from "./DDBItem";
import { TriggerBtn } from "@/components/TriggerBtn";

export function DDBUpload() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TriggerBtn icon={Plus} label="بارگذاری" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto rounded-xl p-2" align="start">
        <DropdownMenuGroup className=" flex flex-col ">
          <DropdownMenuItem asChild className="justify-end p-0">
            {/* Upload item */}
            <Modal />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0 ">
            {/* Write item */}
            <DDBItem icon={Pencil} label="نوشتن" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
