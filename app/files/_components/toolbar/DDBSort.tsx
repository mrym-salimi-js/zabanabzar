"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TriggerBtn } from "@/components/TriggerBtn";
import { Sort } from "@/components/Icons";

export function DDBSort() {
  const [position, setPosition] = React.useState("new");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TriggerBtn icon={Sort} label="مرتب سازی" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-2 rounded-xl dark:bg-[var(--tertiary-dark)]">
        <DropdownMenuRadioGroup
          className="flex flex-col"
          value={position}
          onValueChange={setPosition}
        >
          <DropdownMenuRadioItem
            className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)] "
            value="new"
          >
            جدیدترین
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
            value="old"
          >
            قدمی ترین
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
