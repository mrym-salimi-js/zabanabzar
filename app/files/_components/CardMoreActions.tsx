import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Edit, More } from "@/components/Icons";
import { ReactElement } from "react";
import { useDownloadFile } from "@/hooks/api/files";
import DDBItem from "./toolbar/DDBItem";

export function CardMoreActions({
  fileUrl,
}: {
  fileUrl: string;
}): ReactElement {
  const downloadMutation = useDownloadFile();
  // Handle download file
  const handleDownloadFile = () => {
    downloadMutation.mutate([fileUrl]);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <More classes="size-6 rotate-[90deg] text-black dark:text-[var(--tertiary)]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto rounded-xl p-2" align="start">
        <DropdownMenuGroup className=" flex flex-col">
          <DropdownMenuItem className="justify-end p-0">
            {/* Edit */}
            <DDBItem icon={Edit} label="ویرایش" />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Download */}
            <DDBItem
              handleAction={handleDownloadFile}
              icon={Download}
              label="دانلود"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
