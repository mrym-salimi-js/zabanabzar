import { Bin, Download, Edit, FileWithName, Text } from "@/components/Icons";
import { ReactElement } from "react";

export default function MobileTable(): ReactElement {
  return (
    <div className="w-full h-auto md:hidden flex flex-col gap-1.5 ">
      <div className="w-full h-auto flex flex-col  border-[1px] border-gray-300 rounded-[15px] overflow-hidden ">
        <div className="w-full h-10 ">
          <div className="w-full h-10 p-4 flex flex-row-reverse bg-gray-100 border-b-[1px] items-center gap-1 dark:bg-[var(--tertiary-dark)] dark:text-white">
            {/*File ext icon */}
            <FileWithName size="w-6 h-6" color="red" name="PDF" />
            {/*File name */}
            <p className="text-[0.8rem] ">متن تستی</p>
          </div>
        </div>
        <div className="w-full h-10 p-2 flex  border-b-[1px] items-center justify-between  ">
          <p className="text-[0.8rem] dark:text-white"> 3 MG</p>
          <p className="text-[0.8rem] text-[var(--tertiary)]">حجم</p>
        </div>

        <div className="w-full h-10 p-2 flex  items-center justify-between border-b-[1px] ">
          <p className="text-[0.8rem] dark:text-white">1400/2/1</p>
          <p className="text-[0.8rem] text-[var(--tertiary)]">تاریخ</p>
        </div>
        <div className="w-full h-10 p-2 flex   items-center justify-between  ">
          <Text color="var(--fourth)" size="size-6" />
          <p className="text-[0.8rem] text-[var(--tertiary)]">متن</p>
          {/* Or Visit icon */}
        </div>
        <div className="w-full h-10 flex flex-row-reverse items-center justify-between">
          <span className="w-1/2 h-full flex items-center justify-center bg-[var(--secondary-light)] dark:bg-[var(--secondary-dark)]  cursor-pointer hover:opacity-[0.7]">
            <Edit color={"var(--secondary)"} size={"size-5"} />
          </span>
          <span className="w-1/2 h-full flex items-center justify-center bg-[var(--fourth)]  cursor-pointer hover:opacity-[0.7]">
            <Download color={"#ffffff"} size={"size-5"} />
          </span>
          <span className="w-1/2 h-full bg-[var(--primary-light)] dark:bg-[var(--primary-dark)] flex items-center justify-center cursor-pointer hover:opacity-[0.7]">
            <Bin color={"var(--primary)"} size={"size-5"} />
          </span>
        </div>
      </div>
    </div>
  );
}
