"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bin, Download, Edit, More } from "@/components/Icons";
import DDBItem from "@/app/files/_components/toolbar/DDBItem";
import Modal from "@/app/flashcards/_components/modal/Modal";
import { useRef } from "react";
import { useDeleteFlashCards, useEditFlashCard } from "@/hooks/api/flashCards";
import { FlashCardItem } from "@/types/flashcard";
import { useFlashCardStore } from "@/store/uploadFlashCardstore";
import { useDownloadFiles } from "@/hooks/api/downloadFileFromStorage";

type FlashCardMoreActionsProps = {
  flashCard: FlashCardItem;
};
export function FlashCardMoreActions({ flashCard }: FlashCardMoreActionsProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const editeMutation = useEditFlashCard();
  const { currentWord } = useFlashCardStore();
  const deleteMutation = useDeleteFlashCards();

  const downloadMutation = useDownloadFiles();
  // Handle download file (audio of flashcard)
  const handleDownloadBtn = () => {
    const flashCards = [{ id: flashCard.id, url: flashCard.audioUrl }];
    downloadMutation.mutate(flashCards, {
      onSuccess: () => {
        closeRef.current?.click();
      },
    });
  };

  // Handle delete flashcards
  const handleDeleteBtn = () => {
    const flashCards = [{ id: flashCard.id, url: flashCard.audioUrl }];
    deleteMutation.mutate(flashCards, {
      onSuccess: () => {
        closeRef.current?.click();
      },
    });
  };

  // Handle edit flashCard
  const handleEditBtn = () => {
    // Delete some unnessesary items
    const userId = 1;
    delete currentWord.id;
    delete currentWord.audioId;

    const updatedData = {
      id: flashCard.id, // داده اصلی
      ...currentWord, // تغییرات جدید از استور
    };

    // Send Text into server by mutate
    editeMutation.mutate(
      { data: { ...updatedData, userId } },
      {
        onSuccess: () => {
          closeRef.current?.click();
        },
      }
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <More classes="size-6 rotate-[90deg] text-black dark:text-[var(--tertiary)]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto rounded-xl p-2" align="start">
        <DropdownMenuGroup className=" flex flex-col">
          {/* Edit */}
          <Modal
            flashCard={flashCard}
            handleConfirm={handleEditBtn}
            triggerBtn={
              <DropdownMenuItem asChild className="justify-end p-0">
                <DDBItem icon={Edit} label="ویرایش" />
              </DropdownMenuItem>
            }
            headerDesc="اینجا میتونی اطلاعات مربوط به واژه رو ویرایش کنی"
            headerTitle="ویرایش واژه"
            closeRef={closeRef}
            mutation={editeMutation}
          />

          <DropdownMenuItem className="justify-end p-0">
            {/* Delete */}
            <DDBItem handleAction={handleDeleteBtn} icon={Bin} label="حذف" />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Download */}
            <DDBItem
              handleAction={handleDownloadBtn}
              icon={Download}
              label="دانلود"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
