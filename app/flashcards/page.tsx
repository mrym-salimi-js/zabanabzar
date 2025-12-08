import CardsList from "./card/CardsList";
import ToolBar from "./ToolBar";

export default function FlashCardsPage() {
  return (
    <>
      <div className="w-full h-auto flex flex-col gap-2 rounded-sm  items-end pb-2">
        {/*Wrapper for check scroll and click */}
        <ToolBar />
        <CardsList />
      </div>
    </>
  );
}
