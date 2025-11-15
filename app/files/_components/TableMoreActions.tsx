import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bin, Download, Edit, More, Visit } from "@/components/Icons";
import DDBItem from "./toolbar/DDBItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteFromStorage } from "@/services/deleteFromStorage";

type MorActionProp = {
  fileUrl: string;
};

export function TableMoreActions({ fileUrl }: MorActionProp) {
  const queryClient = useQueryClient();

  // Delete file mutation
  const mutation = useMutation<void, Error, string[]>({
    mutationFn: async (file: string[]) => {
      const res = await fetch("/api/files", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(file),
      });
      // Delete file from storage (s3)
      await deleteFromStorage(file);
      if (!res.ok) throw new Error("خطا در حذف فایل ");
      return res.json();
    },
    onSuccess: () => {
      toast.success("فایل حذف شد");

      // Update files list
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: () => toast.error("حذف ناموفق بود"),
  });

  // Handle delete file
  const handleDeleteFile = () => {
    mutation.mutate([fileUrl]);
  };
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
            {/* <DDBItem  icon={Visit} label="متن" /> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Delete */}
            <DDBItem handleAction={handleDeleteFile} icon={Bin} label="حذف" />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Edit */}
            {/* <DDBItem icon={Edit} label="ویرایش" /> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Download */}
            {/* <DDBItem icon={Download} label="دانلود" /> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
