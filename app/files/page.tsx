import { Pencil } from "@/components/icon";
import { Modal } from "@/components/files/modals/uploadFiles/Modal";
import { ReactElement } from "react";
import MobileTable from "@/components/files/MobileTable";
import DesktopTable from "@/components/files/DesktopTable";

export default function Home(): ReactElement {
  return (
    <>
      <div className="w-full h-[87%] flex flex-col  p-2">
        <div className="w-full h-20 flex  items-center p-2">
          <div className="flex gap-2 items-center">
            <Modal />
            <span className="w-auto h-auto py-3 px-4 flex gap-2 hover:opacity-[0.7] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--secondary)]">
              <Pencil size="size-4" color="#ffffff" />
              <p className="text-white text-[0.8rem]">نوشتن</p>
            </span>
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-2 bg-whit   rounded-[15px] md:border-[1px] p-2">
          {/* Table for desktop */}
          <DesktopTable />
          {/* Table for mobile */}
          <MobileTable />
        </div>
      </div>
    </>
  );
}
