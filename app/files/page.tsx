import { ReactElement } from "react";
import MobileTable from "@/app/files/_components/MobileTable";
import DesktopTable from "@/app/files/_components/DesktopTable";
import ToolBar from "@/app/files/_components/toolbar/ToolBar";
import { ListItems, SquaredItems } from "@/components/Icons";
import { PaginatedList } from "@/app/files/_components/PaginatedList";
export default function Home(): ReactElement {
  return (
    <>
      <div className="w-full max-h-[90%] flex flex-col gap-1 p-1">
        {/* Toolbar Btns */}
        <ToolBar />
        <div className="w-full h-full flex flex-col gap-2 bg-white dark:bg-[var(--background-dark)] rounded-[15px] md:border-[1px] p-2">
          {/*Two type btn of table layout */}
          <div className="w-auto h-auto flex gap-2 items-center ml-2">
            <span className="w-auto h-auto p-2 border hover:opacity-[0.7] cursor-pointer rounded-lg overflow-hidden bg-gray-50">
              <ListItems color="black" size="size-5" />
            </span>
            <span className="w-auto h-auto p-2 border hover:opacity-[0.7] cursor-pointer rounded-lg overflow-hidden bg-black">
              <SquaredItems color="#ffffff" size="size-5" />
            </span>
          </div>
          {/* Table for desktop */}
          <DesktopTable />
          {/* Table for mobile */}
          <MobileTable />
        </div>
        {/*Pagination */}
        <PaginatedList />
      </div>
    </>
  );
}
