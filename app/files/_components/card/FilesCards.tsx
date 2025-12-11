"use client";

import { ReactElement, useEffect } from "react";
import { FileItem } from "@/types/file";
import FilesCardsSkeleton from "@/components/skeletons/FilesCardsSkeleton";
import { FileCard } from "./Card";
import { useInView } from "react-intersection-observer";

type FilesCardsProps = {
  filesList: FileItem[];
  isLoading: boolean;
  onLoadMore?: () => void;
  status: string;
};

export default function FilesCards({
  filesList,
  isLoading,
  onLoadMore,
  status,
}: FilesCardsProps): ReactElement {
  // Next page loading
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && onLoadMore) {
      onLoadMore();
    }
  }, [inView, onLoadMore]);

  return (
    <div className="w-full h-auto flex flex-wrap gap-2 items-center justify-evenly">
      {status === "pending" ? (
        // Skeleton for first page
        <FilesCardsSkeleton skeletonCount={4} />
      ) : (
        <>
          {/* files */}
          {filesList.map((file, index) => (
            <FileCard key={index} file={file} />
          ))}

          {/* Skeleton for end of list for scrolling */}
          {isLoading && <FilesCardsSkeleton skeletonCount={2} />}

          {/* Sentinel for scroll */}
          <div ref={ref}></div>
        </>
      )}
    </div>
  );
}
