import ToolBar from "@/app/files/_components/toolbar/ToolBar";
import { PaginatedList } from "@/app/files/_components/PaginatedList";
import Tabs from "./_components/Tabs";
import { FilesList } from "./_components/FilesList";
import Notification from "@/components/Notification";

export default function Home() {
  return (
    <div className="w-full max-h-[90%] flex flex-col gap-1 ">
      {/* Toolbar Btns */}
      <ToolBar />
      <div className="w-full h-auto flex flex-col gap-2 rounded-sm md:border-[1px] items-end">
        {/* Tabs */}
        <Tabs />
        {/*Extraction text from file proccess */}
        <Notification />
        {/*List of files */}
        <FilesList />
      </div>
      {/*Pagination */}
      <PaginatedList />
    </div>
  );
}
