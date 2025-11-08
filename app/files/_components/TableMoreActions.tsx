import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bin, Download, Edit, More, Visit } from "@/components/Icons";

export function TableMoreActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <More classes="size-6 text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto rounded-xl p-2" align="start">
        <DropdownMenuGroup className=" flex flex-col">
          <DropdownMenuItem className="justify-end p-0 ">
            {/* Visit or extraction */}
            <div className="w-full p-2 flex justify-end hover:bg-[var(--primary-light)] hover:text-[var(--primary)] rounded-md gap-2 text-[0.7rem] cursor-pointer">
              <p>متن</p>
              <Visit classes="size-5 text-black)]" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Delete */}
            <div className="w-full justify-end hover:bg-[var(--primary-light)] hover:text-[var(--primary)] rounded-md p-2 flex gap-2 text-[0.7rem] cursor-pointer">
              <p>حذف</p>
              <Bin classes="size-5 text-black)]" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Edit */}
            <div className="w-full justify-end hover:bg-[var(--primary-light)] hover:text-[var(--primary)] rounded-md p-2 flex gap-2 text-[0.7rem] cursor-pointer">
              <p>ویرایش</p>
              <Edit classes="size-5 text-black" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Download */}
            <div className="w-full justify-end hover:bg-[var(--primary-light)] hover:text-[var(--primary)] rounded-md p-2 flex gap-2 text-[0.7rem] cursor-pointer">
              <p>دانلود</p>
              <Download classes="size-5 text-black)]" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
