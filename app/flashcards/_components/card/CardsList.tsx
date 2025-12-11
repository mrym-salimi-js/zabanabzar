"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FlashCardstResponse } from "@/types/flashcard";
import Card from "./Card";
import FilesCardsSkeleton from "@/components/skeletons/FilesCardsSkeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function CardsList() {
  const limit = 10;
  const infiniteQuery = useInfiniteQuery<FlashCardstResponse, Error>({
    queryKey: ["flashCards-infinite", limit],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get("/api/flashcards", {
        params: { page: pageParam, limit },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Finall data
  const flashCards = infiniteQuery.data?.pages.flatMap((p) => p.items) ?? [];

  // Next page loading
  const { ref, inView } = useInView();

  // Fetch next page with scrolling and see end of page
  useEffect(() => {
    if (inView && infiniteQuery?.fetchNextPage) {
      infiniteQuery?.fetchNextPage();
    }
  }, [inView, infiniteQuery?.fetchNextPage]);

  return (
    <>
      <div className="w-full h-auto flex flex-wrap gap-2 items-center justify-evenly">
        {infiniteQuery.status === "pending" ? (
          // Skeleton for first page
          <FilesCardsSkeleton skeletonCount={4} />
        ) : (
          <>
            {/* flashcards */}
            {flashCards.map((f) => {
              return <Card key={f.id} flashCard={f} />;
            })}

            {/* Skeleton for end of list for scrolling */}
            {infiniteQuery.isFetching ||
              (infiniteQuery.isFetchingNextPage && (
                <FilesCardsSkeleton skeletonCount={2} />
              ))}
          </>
        )}
      </div>
      {/* Sentinel for scroll */}
      <div ref={ref}></div>
    </>
  );
}
