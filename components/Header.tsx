// import Image from "next/image";
import React, { ReactElement } from "react";
import { ChevronDown, User } from "./icon";

export default function Header(): ReactElement {
  return (
    <header className="w-full h-20 flex flex-row-reverse justify-between items-center bg-white rounded-[4px] p-2">
      {/*Page title */}

      {/* <Image
          alt="کاربر"
          src="/me.png"
          width={50}
          height={50}
          className=" rounded-full  border-4 border-[var(--primary-light)]"
        /> */}
      <div className="flex flex-col items-end justify-center gap-2 p-2">
        <p className="text-[0.8rem] ">آپلود</p>
        <p className="text-[0.7rem] text-[var(--tertiary)]">
          اپلود فایل و تصویر
        </p>
      </div>
      {/* Search */}
      <div className=""></div>
      {/* */}
      <div className="w-16 h-auto p-2 flex gap-2 bg-gray-50 rounded-2xl">
        <User color="var(--tertiary)" size="size-5" />
        <ChevronDown color="var(--tertiary)" size="size-5" />
      </div>
    </header>
  );
}
