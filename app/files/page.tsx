import { ReactElement } from "react";
import MobileTable from "@/app/files/_components/MobileTable";
import DesktopTable from "@/app/files/_components/DesktopTable";
import ToolBar from "@/app/files/_components/toolbar/ToolBar";
import { PaginatedList } from "@/app/files/_components/PaginatedList";
import Tabs from "./_components/Tabs";
export default function Home(): ReactElement {
  return (
    <>
      <div className="w-full max-h-[90%] flex flex-col gap-1 p-[1px]">
        {/* Toolbar Btns */}
        <ToolBar />
        <div className="w-full h-full flex flex-col gap-4 bg-white dark:bg-[var(--background-dark)] rounded-sm md:border-[1px] p-2">
          {/* Tabs */}
          <Tabs />
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
