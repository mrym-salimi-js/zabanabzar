import { ReactElement } from "react";
import { CheckedFile, FileItem } from "@/types/file";
import FilesTableSkeleton from "@/components/skeletons/FilesTableSkeleton";
import { useFileCheckStore } from "@/store/fileCheckStore";
import Header from "@/app/files/_components/table/Header";
import { FileRow } from "./Row";

// Table props type
type TableProps = {
  filesList: FileItem[];
  isLoading: boolean;
};

// Table
export default function FilesTable({
  filesList,
  isLoading,
}: TableProps): ReactElement {
  const checkedFiles = useFileCheckStore((state) => state.CheckedFiles);
  const toggleId = useFileCheckStore((state) => state.toggleId);

  // Handle single row checkbox
  const handleCheckSingle = (checked: CheckedFile) => {
    toggleId(checked);
  };

  return (
    <div
      dir="rtl"
      className="w-full h-auto p-1 flex flex-col gap-1  bg-white dark:bg-[var(--background-dark)] rounded-2xl"
    >
      {/* Table header */}
      <Header filesList={filesList} />

      {isLoading ? (
        <FilesTableSkeleton skeletonCount={6} />
      ) : (
        <FileRow
          filesList={filesList}
          checkedFiles={checkedFiles}
          handleCheckSingle={handleCheckSingle}
        />
      )}
    </div>
  );
}
