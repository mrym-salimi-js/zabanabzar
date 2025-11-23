"use client";
import { ReactElement } from "react";
import FilesTable from "@/app/files/_components/table/FilesTable";
import FilesCards from "@/app/files/_components/card/FilesCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FileItem } from "@/types/file";

export function FilesList(): ReactElement {
  // Get Files list
  const { data, isLoading } = useQuery<FileItem[]>({
    queryKey: ["files"],
    queryFn: async () => {
      const res = await axios.get("/api/files");
      return res.data;
    },
    staleTime: Infinity, // Stop auto refetch
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const documents = (data ?? []).filter((f) => f.type === "document");

  return (
    <>
      {/* Data in table format  */}
      <FilesTable filesList={documents} isLoading={isLoading} />
      {/* Data in card format  */}
      <FilesCards filesList={documents} isLoading={isLoading} />
    </>
  );
}
