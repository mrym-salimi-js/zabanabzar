"use client";

import React, { ReactElement } from "react";
import { Moon, Search, Sun, User } from "./icon";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Nav from "./Nav";
import { MenuIcon } from "./MenuIcon";
import { Logo } from "./Logo";

export default function Header(): ReactElement {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full h-20 flex bg-white flex-row-reverse justify-between lg:justify-end items-center dark:bg-[var(--background-dark)] p-2 px-4 border-b rounded-sm">
      {/* Right items */}
      <div className="w-auto flex  gap-3 flex-row-reverse items-center lg:hidden">
        {/* Hamburger menu icon*/}
        <Sheet>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>

          {/* Nav in mobile mood*/}
          <SheetContent side="right" className="p-0 w-[70%] sm:w-[300px]">
            <Nav />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Logo />
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
