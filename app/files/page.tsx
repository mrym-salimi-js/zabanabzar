import { ReactElement } from "react";
import MobileTable from "@/components/files/MobileTable";
import DesktopTable from "@/components/files/DesktopTable";
import { DDBUpload } from "@/components/DDBUpload";
export default function Home(): ReactElement {
  return (
    <>
      <div className="w-full h-[87%] flex flex-col p-1">
        {/* Toolbar Btns */}
        <div className="w-full h-15 flex justify-end items-center ">
          <div className="flex gap-2 items-center">
            {/* Drop Down Btn upload */}
            <DDBUpload />
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-2 bg-white dark:bg-[var(--background-dark)] rounded-[15px] md:border-[1px] p-2">
          {/* Table for desktop */}
          <DesktopTable />
          {/* Table for mobile */}
          <MobileTable />
        </div>
      </div>
    </>
  );
}
