"use client";
import { useFileCheckStore } from "@/store/fileCheckStore";
import { FlashCardItem } from "@/types/flashcard";
import clsx from "clsx";
import { useState } from "react";
import { FlashCardMoreActions } from "./FlashCardMoreActions";
import { UTurnLeft, Voice } from "@/components/Icons";
import { wordRepeatDay, wordTypesColored } from "@/constants/flashCards";
import { GreenCheckBox } from "@/components/GreenCheckBox";
import { CheckedFile } from "@/types/file";

type CardProps = {
  flashCard: FlashCardItem;
};
export default function Card({ flashCard }: CardProps) {
  const checkedFiles = useFileCheckStore((state) => state.CheckedFiles);
  const toggleId = useFileCheckStore((state) => state.toggleId);
  const [flipped, setFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play and pause recorded audio
  const handlePlayPause = async () => {
    const audio = new Audio(flashCard.audioUrl);
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle checkbox
  const handleCheckSingle = (checked: CheckedFile) => {
    toggleId(checked);
  };

  return (
    <div
      className={clsx(
        "w-full h-[240px] md:w-[400px] lg:w-[414px] p-2  shadow-lg border-gray-300 rounded-2xl overflow-hidden bg-white dark:bg-[var(--background-dark)]  perspective  duration-500 preserve-3d",
        flipped && "rotate-y-180"
      )}
    >
      {/*Front */}
      {!flipped && (
        <div className="w-full inset-0 backface-hidden flex flex-col gap-1.5 relative">
          {/* Uturn icon */}
          <div
            onClick={() => {
              setFlipped(!flipped);
            }}
            className="py-2 px-3 rounded-full flex items-center justify-center cursor-pointer bg-[var(--secondary)] absolute top-[100px] right-[-19px] hover:opacity-[0.7]"
          >
            <UTurnLeft classes="size-4.5 text-white rotate-[180deg]" />
          </div>
          {/* Header */}
          <div className="w-full h-10 flex p-2 items-center justify-between dark:bg-[var(--tertiary-dark)] border-b-[1px] dark:rounded-md">
            <FlashCardMoreActions flashCard={flashCard} />
            <GreenCheckBox
              checked={checkedFiles.some((i) => i.id === flashCard.id)}
              onChange={() =>
                handleCheckSingle({ id: flashCard.id, url: flashCard.audioUrl })
              }
            />
          </div>
          {/*Content */}
          <div className="w-full h-auto flex flex-col gap-3 items-center py-1">
            <div className="w-full flex flex-row-reverse justify-between items-center p-2">
              <div className="flex flex-row-reverse gap-2 items-center">
                {/*Word Audio */}
                <div onClick={handlePlayPause} className="w-auto h-auto flex ">
                  <Voice classes="size-5 cursor-pointer rotate-[180deg] dark:text-[var(--tertiary)] hover:text-[var(--primary)]" />
                </div>
                {/*Word */}
                <p className="text-sm dark:text-white">{flashCard.word}</p>
              </div>
              <div className="flex gap-2">
                {/*Word type */}
                <span
                  className={`px-2 py-1 rounded-md ${wordTypesColored["Noun"]}`}
                >
                  <p className="text-[0.7rem] text-white">{flashCard.type}</p>
                </span>
                {/*Word repeat */}
                <span
                  className={`px-2 py-1 rounded-md ${wordRepeatDay["1"].bg}`}
                >
                  <p className="text-[0.7rem] text-white">
                    {wordRepeatDay["1"].label}
                  </p>
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 p-1 items-center">
              {/* Word translation */}
              <p className="text-sm dark:text-white">{flashCard.translation}</p>

              {/* Word Example */}
              <span className="w-[90%] h-auto  p-2 rounded-md border flex justify-start relative">
                <p className="absolute top-[-10px] right-3 px-2 text-[0.8rem] text-gray-400 dark:text-[var(--tertiary)] bg-white rounded-md">
                  مثال
                </p>
                <p className="max-h-[60px] overflow-y-scroll text-sm text-gray-500 dark:text-[var(--tertiary)]">
                  {flashCard.example}
                </p>
              </span>
            </div>
          </div>
        </div>
      )}

      {/*Back */}
      {flipped && (
        <div className="w-full h-[240px] inset-0 rotate-y-180 relative">
          {/* Uturn icon */}
          <div
            onClick={() => {
              setFlipped(!flipped);
            }}
            className="py-2 px-3 rounded-full flex items-center justify-center cursor-pointer bg-[var(--secondary)] absolute top-[100px] left-[-19px] hover:opacity-[0.7]"
          >
            <UTurnLeft classes="size-4.5 text-white " />
          </div>
          {/* Header */}
          <div className="w-full h-10 flex p-2 items-center justify-between dark:bg-[var(--tertiary-dark)] border-b-[1px] dark:rounded-md">
            <FlashCardMoreActions flashCard={flashCard} />
            <GreenCheckBox
              checked={checkedFiles.some((i) => i.id === flashCard.id)}
              onChange={() =>
                handleCheckSingle({ id: flashCard.id, url: flashCard.audioUrl })
              }
            />
          </div>
          {/* Content */}
          <div className="w-full h-auto flex flex-col gap-3 items-center justify-center py-1">
            {/* Word Description */}
            <span className="w-[90%] h-[150px] overflow-y-scroll p-2 rounded-md  flex justify-start">
              <p className="text-sm  dark:text-white ">
                {flashCard.description}
              </p>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
