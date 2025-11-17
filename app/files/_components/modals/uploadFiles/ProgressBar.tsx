"use client";

import { Progress } from "@/components/ui/progress";
import { ReactElement } from "react";

type Progress = { percent: number; status: string };
export function ProgressBar({ percent, status }: Progress): ReactElement {
  const trackColor =
    status === "uploading"
      ? "bg-yellow-100"
      : status === "done"
        ? "bg-secondary/20"
        : status === "error"
          ? "bg-primary/20"
          : "bg-gray-200";

  const indicatorColor =
    status === "uploading"
      ? "bg-yellow-500"
      : status === "done"
        ? "bg-[var(--secondary)]"
        : status === "error"
          ? "bg-[var(--primary)]"
          : "bg-gray-400";
  return (
    <Progress
      value={percent}
      className={`w-full h-1 ${trackColor}`} // background track
      indicatorColor={indicatorColor} // خود progress bar
    />
  );
}
