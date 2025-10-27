"use client";

import { Progress } from "@/components/ui/progress";
import { ReactElement } from "react";

type Progress = { percent: number; status: string };
export function ProgressBar({ percent, status }: Progress): ReactElement {
  return (
    <>
      {status === "uploading" && (
        <Progress
          value={percent}
          className={`w-full h-1 ${status === "uploading" && `bg-yellow-100`}  `}
          indicatorColor={`${status === "uploading" && `bg-yellow-500`}`}
        />
      )}
      {status === "done" && (
        <Progress
          value={percent}
          className={`w-full h-1 ${status === "done" && `bg-secondary/20`}  `}
          indicatorColor={`${status === "done" && `bg-[var(--secondary)]`}`}
        />
      )}
      {status === "error" && (
        <Progress
          value={percent}
          className={`w-full h-1 ${status === "error" && `bg-primary/20`}  `}
          indicatorColor={`${status === "error" && `bg-[var(--primary)]`}`}
        />
      )}
    </>
  );
}
