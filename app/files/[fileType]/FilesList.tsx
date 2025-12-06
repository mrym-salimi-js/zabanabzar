"use client";

import { ReactElement } from "react";
import FilesTable from "@/app/files/_components/table/FilesTable";
import FilesCards from "@/app/files/_components/card/FilesCards";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PaginatedList } from "../_components/PaginatedList";
import { FileListResponse } from "@/types/file";
import { useViewFiles } from "@/store/updateFilesViewStore";
import { useFilesPage } from "@/store/upadteFilesPageStore";

type FilesListProps = {
  fileType: string;
};

export function FilesList({ fileType }: FilesListProps): ReactElement {
  const type = fileType;
  const { view } = useViewFiles();
  const { page } = useFilesPage();
  const limit = 10;

  // Get data for pagination --> list
  const listQuery = useQuery<FileListResponse, Error>({
    queryKey: ["files", type, page, limit],
    queryFn: async () => {
      const res = await axios.get<FileListResponse>("/api/files", {
        params: { type, page, limit },
      });
      return res.data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: view === "list",
  });

  // Get data for infinite --> card
  const infiniteQuery = useInfiniteQuery<FileListResponse, Error>({
    queryKey: ["files-infinite", type, limit],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get<FileListResponse>("/api/files", {
        params: { type, page: pageParam, limit },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: Infinity,
    enabled: view === "card",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  //  Finall data
  const files =
    view === "list"
      ? (listQuery.data?.items ?? [])
      : (infiniteQuery.data?.pages.flatMap((p) => p.items) ?? []);

  return (
    <>
      {view === "list" ? (
        <>
          <FilesTable filesList={files} isLoading={listQuery.isLoading} />
          {/*Pagination */}
          <PaginatedList files={listQuery.data ?? undefined} />
        </>
      ) : (
        <FilesCards
          filesList={files}
          isLoading={
            infiniteQuery.isFetchingNextPage || infiniteQuery.isFetching
          }
          onLoadMore={infiniteQuery.fetchNextPage}
        />
      )}
    </>
  );
}
