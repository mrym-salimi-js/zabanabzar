"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "@/components/Icons";
import { TriggerBtn } from "@/components/TriggerBtn";

const fileTypes = [
  { id: "pdf", label: "PDF" },
  { id: "txt", label: "Text" },
  { id: "png", label: "PNG" },
  { id: "jpg", label: "JPG" },
  { id: "mp3", label: "Audio" },
];

export function DDBFilter(): React.ReactElement {
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  const handleCheckedChange = (id: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TriggerBtn icon={Filter} label="فیلتر" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-auto p-2 rounded-xl">
        {fileTypes.map((type) => (
          <DropdownMenuCheckboxItem
            className="justify-end hover:bg-gray-100"
            key={type.id}
            checked={!!selected[type.id]}
            onCheckedChange={(checked) => handleCheckedChange(type.id, checked)}
          >
            {type.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
