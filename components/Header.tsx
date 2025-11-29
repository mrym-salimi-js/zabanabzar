"use client";

import React, { ReactElement } from "react";
import { ChevronRightMini, Moon, Search, Sort, Sun, User } from "./Icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Nav from "./Nav";
import { usePathname, useRouter } from "next/navigation";
import { getHeaderMeta } from "@/utils/files/getHeaderMeta";
import { useThemeStore } from "@/store/themStore";
import ThreePointsLoading from "./ThreePointsLoading";

export default function Header(): ReactElement {
  const { theme, toggle } = useThemeStore();
  const router = useRouter();
  const pathname = usePathname();

  const meta = getHeaderMeta(pathname);
  console.log(theme);

  return (
    <header className="w-full h-18 flex bg-white flex-row-reverse justify-between  dark:bg-[var(--background-dark)] p-2 px-4 border rounded-sm">
      {/* Right items */}
      <div className="w-auto h-full flex gap-2 flex-row-reverse items-center">
        <div className="w-auto h-full flex gap-2 items-center lg:hidden ">
          {/* Hamburger menu icon*/}
          <Sheet>
            <SheetTrigger asChild>
              <Sort classes="size-8 text-black dark:text-white" />
            </SheetTrigger>

            {/* Nav in mobile mode*/}
            <SheetContent side="right" className="p-0 w-[70%] sm:w-[300px]">
              <Nav />
            </SheetContent>
          </Sheet>
        </div>
        {/* Header Meta and back btn */}
        <div className="w-auto h-full gap-2 flex-row-reverse flex items-center">
          {/* Go back link */}
          <div
            onClick={() => router.back()}
            className="w-auto h-auto p-0.5 self-start !border-gray-300 cursor-pointer hover:opacity-[0.7] flex items-center justify-center !dark:border-[var(--tertiary-dark)] border-[1px] rounded-md "
          >
            <ChevronRightMini classes="size-5" />
          </div>
          {/* Page Title */}
          <div className="w-full h-auto flex flex-col gap-1 justify-end">
            <h1 className="text-sm dark:text-[var(--fourth)] self-end">
              {meta.title}
            </h1>
            <p className="text-[0.8rem] text-gray-400  dark:text-[var(--tertiary-dark)]">
              {meta.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Left items */}
      <div className="flex gap-1 items-center">
        <div className="w-10 h-10 p-2 flex justify-center cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl">
          <User classes="size-5 text-[var(--tertiary)]" />
        </div>
        <div
          onClick={() => toggle()}
          className="w-10 h-10 p-2 flex justify-center cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl"
        >
          {theme ? (
            theme !== "light" ? (
              <Sun classes="size-5 text-[var(--tertiary)]" />
            ) : (
              <Moon classes="size-5 text-[var(--tertiary)]" />
            )
          ) : (
            <ThreePointsLoading circleColor="bg-[var(--tertiary)] " />
          )}
        </div>
        <div className="w-10 h-10 p-2 flex justify-center cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl">
          <Search classes="size-5 text-[var(--tertiary)]" />
        </div>
      </div>
    </header>
  );
}
