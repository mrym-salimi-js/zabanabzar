import { DDBUpload } from "@/app/files/_components/toolbar/DDBUpload";
import { DDBFilter } from "@/app/files/_components/toolbar/DDBFilter";
import { DDBSort } from "@/app/files/_components/toolbar/DDBSort";
import { DeleteBtn } from "@/app/files/_components/toolbar/DeleteBtn";
import { DownloadBtn } from "@/app/files/_components/toolbar/DownloadBtn";
export default function ToolBar() {
  return (
    <div className="w-full h-15 flex justify-end items-center">
      <div className="flex flex-row-reverse gap-1 items-center p-0  overflow-scroll">
        {/* Drop Down Btn upload */}
        <DDBUpload />
        <DDBFilter />
        <DDBSort />
        <DeleteBtn />
        <DownloadBtn />
      </div>
    </div>
  );
}
