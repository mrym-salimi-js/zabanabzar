"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TriggerBtn } from "@/components/TriggerBtn";
import { UTurnLeft } from "@/components/Icons";
import { useFlashCardStore } from "@/store/uploadFlashCardstore";
import { wordRepeat } from "@/constants/wordRepeat";

export function DDBWordReview() {
  const { setWordType, currentWord } = useFlashCardStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TriggerBtn icon={UTurnLeft} label="تکرار واژه" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-2 rounded-xl dark:bg-[var(--tertiary-dark)]">
        <DropdownMenuRadioGroup
          className="flex flex-col"
          value={currentWord?.repeat || "3"}
          onValueChange={setWordType}
        >
          {wordRepeat?.map((r, i) => {
            return (
              <DropdownMenuRadioItem
                key={i}
                className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
                value={r.day}
              >
                {r.status}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
