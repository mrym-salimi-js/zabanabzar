"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TriggerBtn } from "@/components/TriggerBtn";
import { Swatch } from "@/components/Icons";
import { useFlashCardStore } from "@/store/uploadFlashCardstore";
import { wordTypes } from "@/constants/wordTypes";

export function DDBWordType() {
  const { setWordType, currentWord } = useFlashCardStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TriggerBtn icon={Swatch} label="نوع واژه" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-2 rounded-xl dark:bg-[var(--tertiary-dark)]">
        <DropdownMenuRadioGroup
          className="flex flex-col"
          value={currentWord?.type || "Unknown"}
          onValueChange={setWordType}
        >
          {wordTypes?.map((t, i) => {
            return (
              <DropdownMenuRadioItem
                key={i}
                className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
                value={t}
              >
                {t}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
