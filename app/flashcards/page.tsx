import { ScrollWrapper } from "@/components/ScrollWrapper";
import { DDBSort } from "../files/_components/toolbar/DDBSort";
import { DeleteBtn } from "../files/_components/toolbar/DeleteBtn";
import { DownloadBtn } from "../files/_components/toolbar/DownloadBtn";
import Modal from "./uploadWord/Modal";

export default function FlashCardsPage() {
  return (
    <>
      <div className="w-full h-15 flex justify-end items-center py-1.5">
        {/*Wrapper for check scroll and click */}
        <ScrollWrapper>
          <Modal />
          <DDBSort />
          <DeleteBtn />
          <DownloadBtn />
        </ScrollWrapper>
      </div>
    </>
  );
}
