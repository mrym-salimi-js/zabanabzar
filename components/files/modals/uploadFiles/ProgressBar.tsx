"use client";

import { Progress } from "@/components/ui/progress";
import { ReactElement, useEffect, useState } from "react";

export function ProgressBar(): ReactElement {
  const [progress, setProgress] = useState<number>(13);

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => setProgress(66),
      500
    );

    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-full h-1 bg-secondary/20 " />;
}
