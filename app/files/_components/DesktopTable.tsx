import { ReactElement } from "react";
import { Clock, FileWithName, Tick } from "@/components/Icons";
import { TableMoreActions } from "./TableMoreActions";
import { GreenCheckBox } from "@/components/GreenCheckBox";
export default function DesktopTable(): ReactElement {
  return (
    <div dir="rtl" className="w-full h-auto p-1 md:flex flex-col gap-1 hidden">
      {/* Table header */}
      <div
        className="w-full h-12 p-3 text-[0.8rem] bg-[var(--tertiary-light)]  dark:bg-[var(--tertiary-dark)] dark:text-white
              grid grid-cols-[40px_repeat(4,1fr)]
              items-center text-end
              rounded-tr-[12px] rounded-tl-[12px]"
      >
        {/*Checkbox */}
        <GreenCheckBox />

        {/*Others */}
        <div className="text-start truncate">نام فایل</div>
        <div className="text-start truncate">تاریخ</div>
        <div className="text-start truncate">حجم</div>
        <div className="text-start truncate">سایر</div>
      </div>

      {/* Table rows */}
      <div
        className="w-full h-12 p-3 text-[0.8rem] border-b   
            grid grid-cols-[40px_repeat(4,1fr)]
            items-start text-end pb-2"
      >
        {/*Checkbox */}
        <GreenCheckBox />
        {/*Others */}
        <div className="flex truncate gap-1 items-start justify-start min-w-0 dark:text-white   ">
          <FileWithName size="w-6 h-6" color="orange" name="PNG" />
          متن تستی
        </div>
        <div className=" text-start flex flex-col  min-w-0 dark:text-white">
          <p>1400/2/1</p>
          <div className="flex gap-1 items-center">
            <Clock color="#cccccc" size="size-3 mb-0.5" />
            <p className="text-[0.7rem] text-gray-300">10:25</p>
          </div>
        </div>
        <div className="text-start truncate min-w-0 dark:text-white">2 MG</div>
        <div className="text-start truncate  min-w-0 dark:text-white cursor-pointer hover:opacity-[0.7]">
          <TableMoreActions />
        </div>
      </div>
    </div>
  );
}
