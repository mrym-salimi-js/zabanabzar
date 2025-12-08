import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bin, Edit, More } from "@/components/Icons";
import DDBItem from "@/app/files/_components/toolbar/DDBItem";

export function FlashCardMoreActions() {
  // Handle delete flashCard
  const handleDeleteBtn = () => {};

  // Handle edit flashCard
  const handleEditBtn = () => {};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <More classes="size-6 rotate-[90deg] text-black dark:text-[var(--tertiary)]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto rounded-xl p-2" align="start">
        <DropdownMenuGroup className=" flex flex-col">
          {
            <DropdownMenuItem className="justify-end p-0">
              {/* Edit */}
              <DDBItem
                handleAction={handleEditBtn}
                icon={Edit}
                label="ویرایش"
              />
            </DropdownMenuItem>
          }

          <DropdownMenuItem className="justify-end p-0">
            {/* Delete */}
            <DDBItem handleAction={handleDeleteBtn} icon={Bin} label="حذف" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
