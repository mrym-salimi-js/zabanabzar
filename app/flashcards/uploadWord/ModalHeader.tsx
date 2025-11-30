"use client";

import { Upload } from "@/components/Icons";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useThemeStore } from "@/store/themStore";
// import { useTheme } from "next-themes";
import React, { ReactElement } from "react";

export default function ModalHeader(): ReactElement {
  const { theme } = useThemeStore();
  return (
    <DialogHeader className="gap-3 items-end">
      <div className="flex gap-2 items-center">
        <DialogTitle className="text-end text-sm dark:text-white">
          بارگذاری واژه
        </DialogTitle>
        <Upload
          classes={` size-5 ${theme === "dark" ? "#ffffff" : "#000000"}`}
        />
      </div>

      <DialogDescription className="text-end text-[0.8rem] text-gray-500">
        اینجا میتونی برای واژه ها فلش کارت بسازی
      </DialogDescription>
    </DialogHeader>
  );
}
