"use client";
import { ReactElement } from "react";
import FilesTable from "@/app/files/documents/FilesTable";
import FilesCards from "@/app/files/documents/FilesCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FilesList(): ReactElement {
  // Get texts list
  const type = "text" as const;
  const { data, isLoading } = useQuery({
    queryKey: ["texts"],
    queryFn: async () => {
      const res = await axios.get("/api/files", {
        params: [type],
      });
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
