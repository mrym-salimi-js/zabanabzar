import { DDBUpload } from "@/app/files/_components/toolbar/DDBUpload";
// import { DDBFilter } from "@/app/files/_components/toolbar/DDBFilter";
import { DDBSort } from "@/app/files/_components/toolbar/DDBSort";
import { DeleteBtn } from "@/app/files/_components/toolbar/DeleteBtn";
import { DownloadBtn } from "@/app/files/_components/toolbar/DownloadBtn";
import { DDBView } from "./DDBView";
import { ScrollWrapper } from "@/components/ScrollWrapper";

export default function ToolBar() {
  return (
    <div className="w-full h-15 flex justify-end items-center py-1.5">
      {/*Wrapper for check scroll and click */}
      <ScrollWrapper>
        <DDBView />
        <DDBUpload />
        {/* <DDBFilter /> */}
        <DDBSort />
        <DeleteBtn />
        <DownloadBtn />
      </ScrollWrapper>
    </div>
  );
}
