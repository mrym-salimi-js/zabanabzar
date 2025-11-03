"use client";

import React, { ReactElement } from "react";
import { Moon, Search, Sun, User } from "./icon";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Nav from "./Nav";

export default function Header(): ReactElement {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full h-20 flex flex-row-reverse justify-between lg:justify-end items-center dark:bg-[var(--background-dark)] p-2 px-4 border-b">
      {/* Right items */}
      <div className="w-auto flex  gap-2 flex-row-reverse items-center lg:hidden">
        {/* منوی همبرگری موبایل */}
        <Sheet>
          <SheetTrigger asChild>
            <div className="w-6 h-auto flex flex-col gap-1 cursor-pointer hover:opacity-[0.7] items-end">
              <span className="w-full h-[3px] bg-gray-700 rounded-full"></span>
              <span className="w-full h-[3px] bg-gray-700 rounded-full"></span>
              <span className="w-2/3 h-[3px] bg-gray-700 rounded-full"></span>
            </div>
          </SheetTrigger>

          {/* Nav به‌صورت Sheet در موبایل */}
          <SheetContent side="right" className="p-0 w-[70%] sm:w-[300px]">
            <Nav />
          </SheetContent>
        </Sheet>

        {/* لوگو */}
        <div className="flex flex-row-reverse gap-2 items-center">
          <Image
            alt="زبان ابزار"
            src="/Logo.png"
            width={30}
            height={30}
            priority
          />
          <h1 className="dark:text-white">زبان ابزار</h1>
        </div>
      </div>

      {/* Left items */}
      <div className="flex gap-1">
        <div className="p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl">
          <User color="var(--tertiary)" size="size-5" />
        </div>
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl"
        >
          {theme === "dark" ? (
            <Sun color="var(--tertiary)" size="size-5" />
          ) : (
            <Moon color="var(--tertiary)" size="size-5" />
          )}
        </div>
        <div className="p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl">
          <Search color="var(--tertiary)" size="size-5" />
        </div>
      </div>
    </header>
  );
}
