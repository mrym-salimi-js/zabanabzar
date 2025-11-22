import { ReactElement } from "react";
import { Clock, FileWithName } from "@/components/Icons";
import { GreenCheckBox } from "@/components/GreenCheckBox";
import { FileListResponse } from "@/types/file";
import moment from "moment-jalaali";
import { fileTypeColorClasses } from "@/constants/fileTypeColorClasses";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import FilesTableSkeleton from "@/components/skeletons/FilesTableSkeleton";
import { useFileCheckStore } from "@/store/fileCheckStore";
import { useDeleteFiles } from "@/hooks/api/files";
import ThreePointsLoading from "@/components/ThreePointsLoading";
import { TableMoreActions } from "../_components/TableMoreActions";

// Table props type
type TableProps = {
  filesList: FileListResponse;
  isLoading: boolean;
};

// Table
export default function FilesTable({
  filesList,
  isLoading,
}: TableProps): ReactElement {
  const selectedUrls = useFileCheckStore((state) => state.selectedUrls);
  const selectAll = useFileCheckStore((state) => state.selectAll);
  const clearAll = useFileCheckStore((state) => state.clearAll);
  const toggleId = useFileCheckStore((state) => state.toggleId);

  // Handle "select all" checkbox
  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      selectAll(filesList.map((file) => file.url));
    } else {
      clearAll();
    }
  };

  // Handle single row checkbox
  const handleCheckSingle = (url: string) => {
    toggleId(url);
  };

  return (
    <div
      dir="rtl"
      className="w-full h-auto p-1 md:flex flex-col gap-1 hidden bg-white dark:bg-[var(--background-dark)] rounded-2xl"
    >
      {/* Table header */}
      <div
        className="w-full h-12 p-3 text-[0.8rem] bg-[var(--tertiary-light)] dark:bg-[var(--tertiary-dark)]
              grid grid-cols-[40px_repeat(5,1fr)]
              items-center text-end
              rounded-tr-[12px] rounded-tl-[12px] dark:text-white"
      >
        <GreenCheckBox
          checked={selectedUrls?.length === filesList?.length}
          onChange={handleCheckAll}
        />

        <div className="text-start truncate">بارگذاری</div>
        <div className="text-start truncate">ویرایش</div>
        <div className="text-start truncate">سایر</div>
      </div>

      {isLoading ? (
        <FilesTableSkeleton skeletonCount={6} />
      ) : (
        <FileRow
          filesList={filesList}
          selectedUrls={selectedUrls}
          handleCheckSingle={handleCheckSingle}
        />
      )}
    </div>
  );
}

// Row props type
type TableRowProps = {
  filesList: FileListResponse;
  selectedUrls: string[];
  handleCheckSingle: (url: string) => void;
};

// Row
export function FileRow({
  filesList,
  selectedUrls,
  handleCheckSingle,
}: TableRowProps) {
  const deleteMutation = useDeleteFiles();
  return filesList?.map((file, index) => (
    <div
      key={file.id}
      className={`w-full h-12 p-3 text-[0.8rem] border-b ${
        index === filesList?.length - 1 ? "border-b-0" : ""
      } grid grid-cols-[40px_repeat(5,1fr)] items-start text-end pb-2 dark:text-[var(--tertiary)]`}
    >
      {/* Checkbox */}
      <GreenCheckBox
        checked={selectedUrls.includes(file.url)}
        onChange={() => handleCheckSingle(file.url)}
      />

      {/* File Info */}
      <div className="flex truncate gap-1 items-start justify-start min-w-0 dark:text-white">
        <FileWithName
          classes={`w-7 h-7 ${fileTypeColorClasses[file.ext] || fileTypeColorClasses.default}`}
          name={"text"}
        />
      </div>

      <div className="text-start flex flex-col min-w-0">
        <p>
          {toPersianNumbers(moment(file.createdAt).format("jYYYY/jMM/jDD"))}
        </p>
        <div className="flex gap-1 items-center">
          <Clock classes="text-[#cccccc] dark:text-[var(--tertiary)] size-3 mb-0.5" />
          <p className="text-[0.7rem] text-gray-300 dark:text-[var(--tertiary)]">
            {toPersianNumbers(
              moment(file.createdAt)
                .utcOffset(3.5 * 60)
                .format("HH:mm")
            )}
          </p>
        </div>
      </div>

      <div className="text-start flex flex-col min-w-0">
        <p>
          {toPersianNumbers(moment(file.updatedAt).format("jYYYY/jMM/jDD"))}
        </p>
        <div className="flex gap-1 items-center">
          <Clock classes="text-[#cccccc] dark:text-[var(--tertiary)] size-3 mb-0.5" />
          <p className="text-[0.7rem] text-gray-300 dark:text-[var(--tertiary)]">
            {toPersianNumbers(
              moment(file.updatedAt)
                .utcOffset(3.5 * 60)
                .format("HH:mm")
            )}
          </p>
        </div>
      </div>

      <div className="text-start truncate min-w-0 cursor-pointer hover:opacity-[0.7]">
        {deleteMutation.isPending ? (
          <ThreePointsLoading circleColor="bg-black" />
        ) : (
          <TableMoreActions
            fileUrl={file.url}
            fileId={file.id}
            fileEx={file.exText}
            fileExt={file.ext}
          />
        )}
      </div>
    </div>
  ));
}
