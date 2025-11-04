"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropDownBtn from "./DropDownBtn";
import { Sort } from "./icon";

export function DDBSort() {
  const [position, setPosition] = React.useState("new");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DropDownBtn icon={Sort} label="مرتب سازی" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-2 rounded-xl">
        <DropdownMenuRadioGroup
          className="flex flex-col"
          value={position}
          onValueChange={setPosition}
        >
          <DropdownMenuRadioItem className="justify-end" value="new">
            جدیدترین
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="justify-end" value="old">
            قدمی ترین
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
