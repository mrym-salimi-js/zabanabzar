import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Edit, More } from "@/components/Icons";

export function CardMoreActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <More classes="size-6 rotate-[90deg] text-black dark:text-[var(--tertiary)]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto rounded-xl p-2" align="start">
        <DropdownMenuGroup className=" flex flex-col">
          <DropdownMenuItem className="justify-end p-0">
            {/* Edit */}
            <div className="w-full hover:bg-[var(--primary-light)] hover:text-[var(--primary)] rounded-md  p-2 flex justify-end gap-2 text-[0.7rem] cursor-pointer">
              <p>ویرایش</p>
              <Edit classes="text-black size-5" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Download */}
            <div className="w-full hover:bg-[var(--primary-light)] hover:text-[var(--primary)] rounded-md  p-2 flex justify-end gap-2 text-[0.7rem] cursor-pointer">
              <p>دانلود</p>
              <Download classes="text-black size-5" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
