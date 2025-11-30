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
import { Swatch } from "@/components/Icons";
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
          onValueChange={setWordType}
        >
          <DropdownMenuRadioItem
            className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)] "
            value="Noun"
          >
            Noun
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
            value="Pronoun"
          >
            Pronoun
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
            value="Verb"
          >
            Verb
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
            value="Adjective"
          >
            Adjective
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
            value="Adverb"
          >
            Adverb
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            className="justify-end text-[0.8rem] dark:text-white dark:hover:text-[var(--primary)] dark:hover:bg-[var(--primary-dark)]"
            value="Unknown"
          >
            Unknown
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
