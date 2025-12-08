"use client";

import { ScrollWrapper } from "@/components/ScrollWrapper";
import Modal from "./modal/Modal";
import { TriggerBtn } from "@/components/TriggerBtn";
import { Plus } from "@/components/Icons";
import { useFlashCardStore } from "@/store/uploadFlashCardstore";
import { useUpladeFlashCard } from "@/hooks/api/flashCards";
import { useRef } from "react";
import { DDBSort } from "../files/_components/toolbar/DDBSort";
import { DeleteBtn } from "../files/_components/toolbar/DeleteBtn";
import { DownloadBtn } from "../files/_components/toolbar/DownloadBtn";

export default function ToolBar() {
  const saveMutation = useUpladeFlashCard();
  const { clearStore, currentWord } = useFlashCardStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  // Handle events after click on "تایید" btn
  const handleSendData = async () => {
    // Delete some unnessesary items
    const userId = 1;
    delete currentWord.id;
    delete currentWord.audioId;
    // Send Text into server by mutate
    saveMutation.mutate(
      { data: { ...currentWord, userId } },
      {
        onSuccess: () => {
          clearStore();
          closeRef.current?.click();
        },
      }
    );
  };
  return (
    <ScrollWrapper>
      <Modal
        handleConfirm={handleSendData}
        triggerBtn={<TriggerBtn icon={Plus} label="افزودن" />}
        headerDesc="اینجا میتونی اطلاعات مربوط به واژه رو برگذاری کنی"
        headerTitle="بارگذاری واژه"
        closeRef={closeRef}
        mutation={saveMutation}
      />
      <DDBSort />
      <DeleteBtn />
      <DownloadBtn />
    </ScrollWrapper>
  );
}
