"use client";
import { ReactElement } from "react";
import FilesTable from "@/app/files/_components/table/FilesTable";
import FilesCards from "@/app/files/_components/card/FilesCards";
import { FileItem, FileListResponse } from "@/types/file";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type FilesListProps = {
  initialFiles: FileListResponse;
  fileType: string;
};

export function FilesList({
  initialFiles,
  fileType,
}: FilesListProps): ReactElement {
  //Get Files list in client side for handleing CRUD actions of use in files page
  const { data = [], isLoading } = useQuery<FileItem[]>({
    queryKey: ["files"],
    queryFn: async () => {
      const res = await axios.get("/api/files");
      return res.data;
    },
    initialData: initialFiles ?? [],
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  // Remove 's' from lend of fileType string
  const type = fileType.slice(0, -1);

  // Get data based on type
  const filesList = data.filter((f) => f.type === type);
  console.log(data);
  return (
    <>
      {/* Data in table format  */}
      <FilesTable filesList={filesList} isLoading={isLoading} />
      {/* Data in card format  */}
      <FilesCards filesList={filesList} isLoading={isLoading} />
    </>
  );
}
