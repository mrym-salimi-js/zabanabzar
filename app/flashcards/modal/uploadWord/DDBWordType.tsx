"use client";

import { Swatch } from "@/components/Icons";
import { TriggerBtn } from "@/components/TriggerBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { wordTypes } from "@/constants/flashCards";
import { useFlashCardStore } from "@/store/uploadFlashCardstore";

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
        >
          {wordTypes?.map((t, i) => {
            return (
              <DropdownMenuRadioItem
                key={i}
                className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
                value={t}
                onChange={() => setWordType(t)}
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
