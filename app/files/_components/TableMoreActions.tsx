import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bin, Download, Edit, More, Visit } from "@/components/Icons";
import DDBItem from "./toolbar/DDBItem";

export function TableMoreActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <More classes="size-6 text-black dark:text-[var(--tertiary)]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-auto rounded-xl p-2 dark:bg-[var(--tertiary-dark)] dark:text-white"
        align="start"
      >
        <DropdownMenuGroup className=" flex flex-col">
          <DropdownMenuItem className="justify-end p-0 ">
            {/* Visit or extraction */}
            <DDBItem icon={Visit} label="متن" />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Delete */}
            <DDBItem icon={Bin} label="حذف" />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Edit */}
            <DDBItem icon={Edit} label="ویرایش" />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Download */}
            <DDBItem icon={Download} label="دانلود" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
