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
        <More size="size-6" color="#000000" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto rounded-xl p-2" align="start">
        <DropdownMenuGroup className=" flex flex-col">
          <DropdownMenuItem className="justify-end p-0 ">
            {/* Visit or extraction */}
            <div className="p-2 flex gap-2 text-[0.7rem] cursor-pointer">
              <p>متن</p>
              <Visit color="var(--secondary)" size="size-5" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Delete */}
            <div className="p-2 flex gap-2 text-[0.7rem] cursor-pointer">
              <p>حذف</p>
              <Bin color="var(--primary)" size="size-5" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Edit */}
            <div className="p-2 flex gap-2 text-[0.7rem] cursor-pointer">
              <p>ویرایش</p>
              <Edit color="#ffcd38" size="size-5" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Download */}
            <div className="p-2 flex gap-2 text-[0.7rem] cursor-pointer">
              <p>دانلود</p>
              <Download color="var(--fourth)" size="size-5" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
