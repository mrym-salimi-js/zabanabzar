import { ReactElement } from "react";

export default function Tabs(): ReactElement {
  return (
    <div className="w-full h-auto  flex flex-row-reverse gap-2 items-center justify-start border-b-2 text-[0.8rem]  text-nowrap dark:text-white border-b-[var(--tertiary)] dark:border-b-[var(--tertiary-light)]">
      <span className="w-22 h-full text-center border-b-2 !border-[var(--primary)] cursor-pointer hover:opacity-[0.7] p-2 text-[var(--primary)]">
        متن و تصاویر
      </span>
      <span className="w-22 h-full text-center cursor-pointer hover:opacity-[0.7] p-2 ">
        ویدئو ها
      </span>
      <span className="w-22 h-full text-center cursor-pointer hover:opacity-[0.7] p-2 ">
        پادکست ها
      </span>
    </div>
  );
}
