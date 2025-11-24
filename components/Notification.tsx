"use client";
import React from "react";
import { Close, Extraction, Tick } from "./Icons";
import ThreePointsLoading from "./ThreePointsLoading";
import { useExtractTextStore } from "@/store/extractTextFromFileStore";

export default function Notification() {
  const { extractedFiles } = useExtractTextStore();
  const status = {
    pending: "در حال پردازش",
    extracting: "در حال استخراج متن از فایل",
    success: "استخراج با موفقیت انجام شد",
    error: "خطا در استخراج متن از فایل",
  };
  return (
    <div className="w-full flex flex-col gap-1 items-end">
      {extractedFiles.map((i) => {
        return (
          <div
            key={i.id}
            className={`w-full sm:w-1/2 h-8 p-3 flex flex-row-reverse items-center gap-2 border-2 ${i.status === "error" ? `!border-[var(--primary)] bg-[var(--primary-light)] dark:bg-[var(--primary-dark)]` : `!border-[var(--secondary)] bg-[var(--secondary-light)] dark:bg-[var(--secondary-dark)]`} rounded-md`}
          >
            <Extraction
              classes={`size-4 ${i.status === "error" ? `text-[var(--primary)]` : `text-[var(--secondary)]`} `}
            />
            <div className="w-[90%] flex  items-center justify-between">
              <p
                className={`text-[0.7rem] ${i.status === "error" ? `text-[var(--primary)]` : `text-[var(--secondary)]`} `}
              >
                {status[i.status]}
              </p>
              <p
                className={`w-[50%] text-[0.7rem] truncate ${i.status === "error" ? `text-[var(--primary)]` : `text-[var(--secondary)]`} `}
              >
                {i.name}
              </p>
            </div>
            {(i.status === "pending" || i.status === "extracting") && (
              <ThreePointsLoading circleColor="bg-[var(--secondary)]" />
            )}
            {i.status === "success" && (
              <Tick classes="size-4 text-[var(--secondary)]" />
            )}
            {i.status === "error" && (
              <Close classes="size-4 text-[var(--primary)]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
