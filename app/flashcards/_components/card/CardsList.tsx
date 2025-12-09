"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FlashCardstResponse } from "@/types/flashcard";
import Card from "./Card";

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

  return (
    <div className="w-full h-auto flex flex-wrap gap-2 items-center justify-end">
      {flashCards.map((f) => {
        return <Card key={f.id} flashCard={f} />;
      })}
    </div>
  );
}
