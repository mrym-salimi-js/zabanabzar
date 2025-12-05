import { ScrollWrapper } from "@/components/ScrollWrapper";
import { DDBSort } from "../files/_components/toolbar/DDBSort";
import { DeleteBtn } from "../files/_components/toolbar/DeleteBtn";
import { DownloadBtn } from "../files/_components/toolbar/DownloadBtn";
import Modal from "./modal/uploadWord/Modal";
import CardsList from "./card/CardsList";

export default function FlashCardsPage() {
  return (
    <>
      <div className="w-full h-auto flex flex-col gap-2 rounded-sm  items-end pb-2">
        {/*Wrapper for check scroll and click */}
        <ScrollWrapper>
          <Modal />
          <DDBSort />
          <DeleteBtn />
          <DownloadBtn />
        </ScrollWrapper>
        <CardsList />
      </div>
    </>
  );
}
