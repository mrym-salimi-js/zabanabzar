// import Image from "next/image";
"use client";
import React, { ReactElement } from "react";
import { ChevronDown, Moon, Search, User } from "./icon";
import { usePathname } from "next/navigation";

type PageTopic = {
  title: string;
  desc: string;
  path: string;
};
export default function Header(): ReactElement {
  const pageTopic: PageTopic[] = [
    {
      title: "آپلود فایل",
      desc: "آپلود فایل ها و تصاویر متنی",
      path: "/upload",
    },
  ];

  const path = usePathname();
  return (
    <header className="w-full h-20 flex flex-row-reverse justify-between items-center bg-white  p-2 px-4 border-b border-gray-100">
      {/*Page title */}

      {/* <Image
          alt="کاربر"
          src="/me.png"
          width={50}
          height={50}
          className=" rounded-full  border-4 border-[var(--primary-light)]"
        /> */}
      <div className="flex flex-col items-end justify-center gap-2 p-2">
        {pageTopic.map((t) => {
          return (
            path.includes(t.path) && (
              <>
                <p className="text-[0.8rem] ">{t.title}</p>
                <p className="text-[0.7rem] text-[var(--tertiary)]">{t.desc}</p>
              </>
            )
          );
        })}
      </div>

      {/*Left items */}
      <div className="flex gap-1">
        <div className=" p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 items-center rounded-xl">
          <User color="var(--tertiary)" size="size-5" />
        </div>
        <div className=" p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 items-center rounded-xl">
          <Moon color="var(--tertiary)" size="size-5" />
        </div>
        <div className=" p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 items-center rounded-xl">
          <Search color="var(--tertiary)" size="size-5" />
        </div>
      </div>
    </header>
  );
}
