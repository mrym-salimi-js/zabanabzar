"use client";
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
import { useViewFiles } from "@/store/updateFilesViewStore";

export function DDBView() {
  const { setView } = useViewFiles();

  const handleListView = () => {
    setView("list");
  };
  const handleCardView = () => {
    setView("card");
  };
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
          <DropdownMenuItem className="justify-end p-0">
            {/* Table item */}
            <DDBItem
              handleAction={handleListView}
              icon={ListItems}
              label="لیستی"
            />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0 ">
            {/* Card item */}
            <DDBItem
              handleAction={handleCardView}
              icon={SquaredItems}
              label="کارتی"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
