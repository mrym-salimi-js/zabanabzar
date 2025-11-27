"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadFileModal from "@/app/files/_components/modals/uploadFiles/Modal";
import UploadTextModal from "@/app/files/_components/modals/uploadText/Modal";
import { TriggerBtn } from "@/components/TriggerBtn";
import { Plus } from "@/components/Icons";
import { useRef } from "react";

export function DDBUpload() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger ref={triggerRef}>
        <TriggerBtn icon={Plus} label="بارگذاری" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-xl p-2">
        <DropdownMenuItem
          asChild
          onSelect={(e) => {
            e.preventDefault();
            triggerRef.current?.classList.add("hidden");
          }}
        >
          <UploadFileModal />
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          onClick={(e) => {
            e.preventDefault();
            triggerRef.current?.click();
          }}
        >
          <UploadTextModal />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
