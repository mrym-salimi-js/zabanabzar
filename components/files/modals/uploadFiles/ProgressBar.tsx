"use client";

import { Progress } from "@/components/ui/progress";
import { ReactElement } from "react";

type Progress = { percent: number; status: string };
export function ProgressBar({ percent, status }: Progress): ReactElement {
  return (
    <Progress
      value={percent}
      className={`w-full h-1 ${status === "error" ? `bg-primary/20` : `bg-secondary/20`}  `}
      indicatorColor={`${status === "error" ? `bg-[var(--primary)]` : `bg-[var(--secondary)]`}`}
    />
  );
}
