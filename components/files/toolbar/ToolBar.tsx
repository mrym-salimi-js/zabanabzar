import { DDBUpload } from "@/components/files/toolbar/DDBUpload";
import { DDBFilter } from "@/components/files/toolbar/DDBFilter";
import { DDBSort } from "@/components/files/toolbar/DDBSort";
import { DeleteBtn } from "@/components/files/toolbar/DeleteBtn";
import { DownloadBtn } from "@/components/files/toolbar/DownloadBtn";
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
