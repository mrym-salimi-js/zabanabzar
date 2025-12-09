import CardsList from "./_components/card/CardsList";
import ToolBar from "@/app/flashcards/_components/ToolBar";

export default function FlashCardsPage() {
  return (
    <>
      <div className="w-full h-auto flex flex-col gap-2 rounded-sm  items-end pb-2">
        <ToolBar />
        <CardsList />
      </div>
    </>
  );
}
