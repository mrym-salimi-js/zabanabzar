import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadFileModal from "@/app/files/_components/modals/uploadFiles/Modal";
import UploadTextModal from "@/app/files/_components/modals/uploadText/Modal";
import { TriggerBtn } from "@/components/TriggerBtn";
import { Plus } from "@/components/Icons";

export function DDBUpload() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TriggerBtn icon={Plus} label="بارگذاری" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-auto rounded-xl p-2 dark:bg-[var(--tertiary-dark)]"
        align="start"
      >
        <DropdownMenuGroup className=" flex flex-col ">
          <DropdownMenuItem asChild className="justify-end p-0 ">
            {/* Upload file */}
            <UploadFileModal />
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="justify-end p-0 ">
            {/* Upload text */}
            <UploadTextModal />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
