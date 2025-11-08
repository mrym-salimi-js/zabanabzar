import { GreenCheckBox } from "@/components/GreenCheckBox";
import { Bin, Clock, FileWithName, Visit } from "@/components/Icons";
import { ReactElement } from "react";
import { CardMoreActions } from "./CardMoreActions";

export default function MobileTable(): ReactElement {
  return (
    <div className="w-full h-auto md:hidden flex flex-col gap-1.5 ">
      <div className="w-full h-auto flex flex-col p-2 gap-1.5 border-2 border-gray-300 rounded-3xl overflow-hidden ">
        {/* Header */}
        <div className="w-full h-10 flex p-2 items-center justify-between border-b-2">
          <CardMoreActions />
          <GreenCheckBox />
        </div>

        {/* Rows */}
        {/* File name, size, icon */}
        <div className="w-full h-auto p-2 flex flex-row-reverse items-center justify-between">
          <div className="max-w-[150px]  flex flex-row-reverse items-center gap-2 dark:bg-[var(--tertiary-dark)] dark:text-white">
            {/*File ext icon */}
            <FileWithName classes="w-7 h-7 text-[#950e0e] mt-1" name="PDF" />
            <div className=" flex flex-col items-end">
              {/*File name */}
              <p className="truncate text-[0.8rem] ">متن تستی</p>
              {/* Size */}
              <p className="text-[0.7rem] text-gray-300 ">2 mg</p>
            </div>
          </div>
          {/* Actions icon */}
          <div className="flex gap-1 items-center">
            {/* Delete */}
            <span className="w-auto h-auto p-2 rounded-full cursor-pointer hover:opacity-[0.7] bg-[var(--primary-light)]">
              <Bin classes="size-4 text-[var(--primary)]" />
            </span>
            {/* Visit or extraction */}
            <span className="w-auto h-auto p-2 rounded-full cursor-pointer hover:opacity-[0.7] bg-[var(--secondary-light)]">
              <Visit classes="size-4 text-[var(--secondary)]" />
            </span>
          </div>
        </div>
        {/* Seprated line */}
        <div className="w-[50%] h-[1px] bg-gray-100 self-end"></div>
        {/* Dates  */}
        <div className="flex flex-col">
          {/*File createAt */}
          <div className="w-full h-auto  p-2 flex  items-center justify-between">
            <div className=" text-start flex text-[0.8rem] text-gray-400 items-center gap-1 min-w-0 dark:text-white">
              <p>1400/2/1</p>
              <p>{" | "}</p>
              <div className="flex gap-1 items-center ">
                <Clock classes="text-[#cccccc] size-3 mb-0.5" />
                <p className="text-[0.7rem]">10:25</p>
              </div>
            </div>
            <p className="text-[0.8rem] mr-1">بارگذاری</p>
          </div>
          {/*File update */}
          <div className="w-full h-auto  p-2 flex  items-center justify-between">
            <div className=" text-start flex text-[0.8rem] text-gray-400 items-center gap-1 min-w-0 dark:text-white">
              <p>1400/2/1</p>
              <p>{" | "}</p>
              <div className="flex gap-1 items-center ">
                <Clock classes="text-[#cccccc] size-3 mb-0.5" />
                <p className="text-[0.7rem]">10:25</p>
              </div>
            </div>
            <p className="text-[0.8rem] mr-1">ویرایش</p>
          </div>
        </div>
      </div>
    </div>
  );
}
