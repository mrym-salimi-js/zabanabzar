"use client";

import React, { ReactElement } from "react";
import { Moon, Search, Sort, Sun, User } from "./Icons";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Nav from "./Nav";
import { Logo } from "./Logo";

export default function Header(): ReactElement {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full h-16 flex bg-white flex-row-reverse justify-between lg:justify-end items-center dark:bg-[var(--background-dark)] p-2 px-4 border rounded-sm">
      {/* Right items */}
      <div className="w-auto flex  gap-3 flex-row-reverse items-center lg:hidden">
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

        {/* Logo */}
        <Logo />
      </div>

      {/* Left items */}
      <div className="flex gap-1">
        <div className="p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl">
          <User classes="size-5 text-[var(--tertiary)]" />
        </div>
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl"
        >
          {theme === "dark" ? (
            <Sun classes="size-5 text-[var(--tertiary)]" />
          ) : (
            <Moon classes="size-5 text-[var(--tertiary)]" />
          )}
        </div>
        <div className="p-2 flex cursor-pointer hover:opacity-[0.7] bg-gray-50 dark:bg-[var(--tertiary-dark)] items-center rounded-xl">
          <Search classes="size-5 text-[var(--tertiary)]" />
        </div>
      </div>
    </header>
  );
}
