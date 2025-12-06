import Notification from "@/components/Notification";
import { FilesList } from "@/app/files/[fileType]/FilesList";
import Tabs from "../_components/Tabs";
import { notFound } from "next/navigation";
import ToolBar from "../_components/toolbar/ToolBar";
import { FileTypes } from "@/types/file";
import { fileTypes } from "@/constants/files";

interface FileTypeParams {
  params: Promise<{ fileType: FileTypes }>;
}

export default async function FileTypePage({ params }: FileTypeParams) {
  const { fileType } = await params;

  if (!fileTypes.includes(fileType)) {
    notFound();
  }

  return (
    <div className="w-full h-auto flex flex-col gap-2 rounded-sm  items-end pb-2">
      {/* Toolbar Btns */}
      <ToolBar />
      <Tabs />
      <Notification />
      <FilesList fileType={fileType} />
    </div>
  );
}
