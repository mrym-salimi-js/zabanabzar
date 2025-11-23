import { ReactElement } from "react";
import { FileListResponse } from "@/types/file";
import FilesCardsSkeleton from "@/components/skeletons/FilesCardsSkeleton";
import { FileCard } from "./Card";

// Cards list props type
type CardsProps = {
  filesList: FileListResponse;
  isLoading: boolean;
};

// Cards list
export default function FilesCards({
  filesList,
  isLoading,
}: CardsProps): ReactElement {
  return (
    <div className="w-full h-auto md:hidden flex flex-col gap-1.5 ">
      {isLoading ? (
        <FilesCardsSkeleton skeletonCount={4} />
      ) : (
        filesList?.map((file) => {
          return <FileCard key={file.id} file={file} />;
        })
      )}
    </div>
  );
}
