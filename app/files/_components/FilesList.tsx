"use client";
import { ReactElement } from "react";
import FilesTable from "./FilesTable";
import FilesCards from "./FilesCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FilesList(): ReactElement {
  // Get Files list
  const { data, isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const res = await axios.get("/api/files");
      return res.data;
    },
    staleTime: Infinity, // Stop auto refetch
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <>
      {/* Data in table format  */}
      <FilesTable filesList={data} isLoading={isLoading} />
      {/* Data in card format  */}
      <FilesCards filesList={data} isLoading={isLoading} />
    </>
  );
}
