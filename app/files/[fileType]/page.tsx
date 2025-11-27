import Notification from "@/components/Notification";
import { FilesList } from "@/app/files/[fileType]/FilesList";
import Tabs from "../_components/Tabs";
import { notFound } from "next/navigation";
import { fileTypes } from "@/constants/fileTypes";
import ToolBar from "../_components/toolbar/ToolBar";

interface FileTypeParams {
  params: Promise<{ fileType: string }>;
}

export default async function FileTypePage({ params }: FileTypeParams) {
  const { fileType } = await params;

  if (!fileTypes.includes(fileType)) {
    notFound();
  }

  return (
    <div className="w-full h-auto flex flex-col gap-2 rounded-sm md:border-[1px] items-end">
      {/* Toolbar Btns */}
      <ToolBar />
      <Tabs />
      <Notification />
      <FilesList fileType={fileType} />
    </div>
  );
}
