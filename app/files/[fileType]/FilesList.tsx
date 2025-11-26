"use client";

import { ReactElement, useState } from "react";
import FilesTable from "@/app/files/_components/table/FilesTable";
import FilesCards from "@/app/files/_components/card/FilesCards";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PaginatedList } from "../_components/PaginatedList";
import { FileListResponse } from "@/types/file";
import { useViewFiles } from "@/store/changeFilesView";

type FilesListProps = {
  fileType: string;
  initialFiles?: FileListResponse;
};

export function FilesList({
  fileType,
  initialFiles,
}: FilesListProps): ReactElement {
  const type = fileType.slice(0, -1);
  const { view } = useViewFiles();
  const [page, setPage] = useState(1);
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
    initialData: initialFiles,
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
    enabled: view === "card",
  });

  //  Finall data
  const files =
    view === "list"
      ? (listQuery.data?.items ?? [])
      : (infiniteQuery.data?.pages.flatMap((p) => p.items) ?? []);

  return (
    <>
      {view === "list" ? (
        <FilesTable filesList={files} isLoading={listQuery.isLoading} />
      ) : (
        <FilesCards filesList={files} isLoading={infiniteQuery.isLoading} />
      )}
      {/*Pagination */}
      <PaginatedList />
    </>
  );
}
