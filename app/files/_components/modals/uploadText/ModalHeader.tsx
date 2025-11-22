"use client";

import { Upload } from "@/components/Icons";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import React, { ReactElement } from "react";

export default function ModalHeader(): ReactElement {
  const { theme } = useTheme();
  return (
    <DialogHeader className="gap-3 items-end">
      <div className="flex gap-3 items-center">
        <DialogTitle className="text-end text-sm dark:text-white">
          اپلود متن
        </DialogTitle>
        <Upload
          classes={` size-5 ${theme === "dark" ? "#ffffff" : "#000000"}`}
        />
      </div>

      <DialogDescription className="text-end text-[0.8rem] text-gray-500">
        اینجا میتونی متن مورد نظرت رو بنویسی یا قرار بدی
      </DialogDescription>
    </DialogHeader>
  );
}
