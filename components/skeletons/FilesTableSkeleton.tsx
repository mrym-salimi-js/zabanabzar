import React from "react";

type Props = {
  skeletonCount: number;
};

export default function FilesTableSkeleton({ skeletonCount }: Props) {
  return Array(skeletonCount)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className="w-full h-12 p-3 text-[0.8rem] border-b
                    grid grid-cols-[40px_repeat(5,1fr)] items-center gap-2"
      >
        {/* Checkbox */}
        <div className="w-4 h-4 animate-shimmer rounded-full" />

        {/* File name + icon */}
        <div className="flex items-center gap-2 min-w-0 ">
          <div className="w-6 h-6 rounded-full animate-shimmer" />
          <div className="h-4 w-32 animate-shimmer rounded" />
        </div>

        {/* Upload date */}
        <div className="flex flex-col gap-1 min-w-0">
          <div className="h-3 w-20 animate-shimmer rounded" />
          <div className="h-3 w-12 animate-shimmer rounded" />
        </div>

        {/* Edit date */}
        <div className="flex flex-col gap-1 min-w-0">
          <div className="h-3 w-20 animate-shimmer rounded" />
          <div className="h-3 w-12 animate-shimmer rounded" />
        </div>

        {/* File size */}
        <div className="h-3 w-16 animate-shimmer rounded" />

        {/* Actions */}
        <div className="h-4 w-10 animate-shimmer rounded" />
      </div>
    ));
}
