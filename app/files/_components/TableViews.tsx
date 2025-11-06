import { ListItems, SquaredItems } from "@/components/Icons";
import React, { ReactElement } from "react";

export function TableViews(): ReactElement {
  return (
    <div className="w-20 h-auto flex bg-[var(--tertiary-light)] rounded-lg p-1 gap-1 items-center ml-2">
      <span className="w-auto h-auto p-1 hover:opacity-[0.7] cursor-pointer">
        <ListItems color="black" size="size-6" />
      </span>
      <span className="w-auto h-auto p-1 hover:opacity-[0.7] cursor-pointer">
        <SquaredItems color="#d8d8d8" size="size-6" />
      </span>
    </div>
  );
}
