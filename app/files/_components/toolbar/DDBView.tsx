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
      <DropdownMenuContent className="w-auto rounded-xl p-2" align="start">
        <DropdownMenuGroup className=" flex flex-col ">
          <DropdownMenuItem asChild className="justify-end p-0">
            {/* List item */}
            <DDBItem icon={ListItems} label="لیستی" />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0 ">
            {/* Grid item */}
            <DDBItem icon={SquaredItems} label="کارتی" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
