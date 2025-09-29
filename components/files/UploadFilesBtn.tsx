import React, { ReactElement } from "react";
import { DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "../icon";

export default function UploadFilesBtn(): ReactElement {
  return (
    <DialogTrigger asChild>
      <span className="w-auto h-auto py-3 px-4 flex gap-2 hover:opacity-[0.7] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--primary)]">
        <Upload size="size-5" color="#ffffff" fill="#ffffff" />
        <p className="text-white text-[0.8rem] ">اپلود</p>
      </span>
    </DialogTrigger>
  );
}
