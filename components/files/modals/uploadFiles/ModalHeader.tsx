"use client";

import { Upload } from "@/components/icon";
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
          اپلود فایل جدید
        </DialogTitle>
        <Upload
          size="size-5"
          color="#ffffff"
          fill={theme === "dark" ? "#ffffff" : "#000000"}
        />
      </div>

      <DialogDescription className="text-end text-[0.8rem] text-gray-400">
        میتونی یک یا چند فایل اپلود کنی
      </DialogDescription>
    </DialogHeader>
  );
}
