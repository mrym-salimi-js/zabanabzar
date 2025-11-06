import { ReactElement } from "react";
import MobileTable from "@/app/files/_components/MobileTable";
import DesktopTable from "@/app/files/_components/DesktopTable";
import ToolBar from "@/app/files/_components/toolbar/ToolBar";
import { PaginatedList } from "@/app/files/_components/PaginatedList";
import { TableViews } from "./_components/TableViews";
export default function Home(): ReactElement {
  return (
    <>
      <div className="w-full max-h-[90%] flex flex-col gap-1 p-1">
        {/* Toolbar Btns */}
        <ToolBar />
        <div className="w-full h-full flex flex-col gap-2 bg-white dark:bg-[var(--background-dark)] rounded-[15px] md:border-[1px] p-2">
          {/*Table view btns */}
          <TableViews />
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
