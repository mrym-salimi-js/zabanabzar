// import Image from "next/image";
"use client";
import React, { ReactElement } from "react";
import { Moon, Search, Sun, User } from "./icon";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

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
      path: "/files",
    },
  ];
  const { theme, setTheme } = useTheme();

  const path = usePathname();
  return (
    <header className="w-full h-20 flex flex-row-reverse justify-between items-center  dark:bg-[var(--background-dark)]  p-2 px-4 border-b  ">
      {/*Page title */}
      {pageTopic.map((t, index) => {
        return (
          path.includes(t.path) && (
            <div
              key={index}
              className="flex flex-col items-end justify-center gap-2 p-2"
            >
              <p className="text-[0.8rem] dark:text-white">{t.title}</p>
              <p className="text-[0.7rem] text-[var(--tertiary)]">{t.desc}</p>
            </div>
          )
        );
      })}

      {/*Left items */}
      <div className="flex gap-1">
        <div className=" p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)]  items-center rounded-xl">
          <User color="var(--tertiary)" size="size-5" />
        </div>
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className=" p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl"
        >
          {theme === "dark" ? (
            <Sun color="var(--tertiary)" size="size-5" />
          ) : (
            <Moon color="var(--tertiary)" size="size-5" />
          )}
        </div>
        <div className=" p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl">
          <Search color="var(--tertiary)" size="size-5" />
        </div>
      </div>
    </header>
  );
}
