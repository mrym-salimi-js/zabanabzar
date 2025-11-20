import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListItems, SquaredItems, Table } from "@/components/Icons";
import DDBItem from "./DDBItem";
import { TriggerBtn } from "@/components/TriggerBtn";

export function DDBView() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TriggerBtn icon={Table} label="نمایش" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-auto h-auto rounded-xl p-2 dark:bg-[var(--tertiary-dark)]"
        align="start"
      >
        <DropdownMenuGroup className=" flex flex-col ">
          <DropdownMenuItem asChild className="justify-end p-0">
            {/* Table item */}
            <DDBItem icon={ListItems} label="لیستی" />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0 ">
            {/* Card item */}
            <DDBItem icon={SquaredItems} label="کارتی" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
