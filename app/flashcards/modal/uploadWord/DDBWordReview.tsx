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
import { RepeatedEveryTypes } from "@/types/flashcard";
import { SecndParam, wordRepeatDay } from "@/constants/flashCards";
export function DDBWordReview() {
  const { setWordRepeat, currentWord } = useFlashCardStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TriggerBtn icon={UTurnLeft} label="تکرار واژه" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-2 rounded-xl dark:bg-[var(--tertiary-dark)]">
        <DropdownMenuRadioGroup
          className="flex flex-col"
          value={currentWord?.repeatEvery}
        >
          {(
            Object.entries(wordRepeatDay) as [RepeatedEveryTypes, SecndParam][]
          )?.map(([key, item]) => {
            return (
              <DropdownMenuRadioItem
                onClick={() => setWordRepeat(key)}
                key={key}
                className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
                value={key}
              >
                {item.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
