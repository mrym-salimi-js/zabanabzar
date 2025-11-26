import Notification from "@/components/Notification";
import { FilesList } from "@/app/files/[fileType]/FilesList";
import Tabs from "../_components/Tabs";
import { notFound } from "next/navigation";
import { FileItem, FileListResponse } from "@/types/file";
import { fileTypes } from "@/constants/fileTypes";

interface FileTypeParams {
  params: Promise<{ fileType: string }>;
}

export default async function FileTypePage({ params }: FileTypeParams) {
  const { fileType } = await params;

  if (!fileTypes.includes(fileType)) {
    notFound();
  }
  // // Remove 's' from lend of fileType string
  const type = fileType?.slice(0, -1);

  // Get data in server side by first loading page
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const res = await fetch(
    `${baseUrl}/api/files?type=${type}&page=${1}&limit=${5}`
  );
  const files: FileListResponse = await res.json();
  console.log(files);
  return (
    <div className="w-full h-auto flex flex-col gap-2 rounded-sm md:border-[1px] items-end">
      <Tabs />
      <Notification />
      <FilesList initialFiles={files} fileType={fileType} />
    </div>
  );
}
