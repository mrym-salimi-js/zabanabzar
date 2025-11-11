"use client";
import { ReactElement } from "react";

type SkeletonProps = {
  skeletonCount: number;
};

export default function FilesCardsSkeleton({
  skeletonCount = 4,
}: SkeletonProps): ReactElement {
  return (
    <div className="w-full h-auto md:hidden flex flex-col gap-1.5">
      {Array(skeletonCount)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="w-full h-auto flex flex-col p-2 gap-1.5 border-2 border-gray-300 rounded-xl overflow-hidden animate-shimmer"
          >
            {/* Header */}
            <div className="w-full h-10 flex p-2 items-center justify-between bg-gray-200 rounded-xl border-b-2 animate-shimmer">
              <div className="w-6 h-6 rounded-full bg-gray-300 animate-shimmer" />
              <div className="w-6 h-6 rounded-full bg-gray-300 animate-shimmer" />
            </div>

            {/* Row: File icon + name + size */}
            <div className="w-full h-auto p-2 flex flex-row-reverse items-center justify-between gap-2">
              <div className="w-auto flex flex-row-reverse items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 animate-shimmer" />
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-32 rounded animate-shimmer" />
                  <div className="h-3 w-20 rounded animate-shimmer" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-1">
                <div className="w-10 h-10 rounded-full bg-gray-300 animate-shimmer" />
                <div className="w-10 h-10 rounded-full bg-gray-300 animate-shimmer" />
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-col gap-2">
              <div className="w-full h-6 flex justify-between">
                <div className="h-4 w-24 rounded animate-shimmer" />
                <div className="h-4 w-12 rounded animate-shimmer" />
              </div>
              <div className="w-full h-6 flex justify-between">
                <div className="h-4 w-24 rounded animate-shimmer" />
                <div className="h-4 w-12 rounded animate-shimmer" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
