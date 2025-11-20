import { GreenCheckBox } from "@/components/GreenCheckBox";
import {
  Bin,
  Clock,
  Extraction,
  FileWithName,
  Visit,
} from "@/components/Icons";
import { ReactElement } from "react";
import { CardMoreActions } from "./CardMoreActions";
import { FileItem, FileListResponse } from "@/types/file";
import { fileTypeColorClasses } from "@/constants/fileTypeColorClasses";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import moment from "moment-jalaali";
import FilesCardsSkeleton from "@/components/skeletons/FilesCardsSkeleton";
import { useDeleteFiles, useExtractionText } from "@/hooks/api/files";
import { useFileCheckStore } from "@/store/fileCheckStore";
import { useExtractTextStore } from "@/store/extractTextFromFileStore";
import Link from "next/link";

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

// Card props type
type TableRowProps = {
  file: FileItem;
};

// Card
export function FileCard({ file }: TableRowProps) {
  const selectedUrls = useFileCheckStore((state) => state.selectedUrls);
  const toggleId = useFileCheckStore((state) => state.toggleId);
  const deleteMutation = useDeleteFiles();
  const extractionMutation = useExtractionText();
  const { addExtraction } = useExtractTextStore();

  // Handle card checkbox
  const handleCheckSingle = (url: string) => {
    toggleId(url);
  };

  // Handle delete file
  const handleDeleteFile = () => {
    deleteMutation.mutate([file.url]);
  };

  // Handle extraction text from file
  const handleExtractionText = () => {
    const fileUrl = file.url;
    const fileName = fileUrl.split(`/`)[4];
    const fileId = file.id;
    const fileExt = file.ext;

    addExtraction(fileId, fileName, undefined);

    // We can sen one argument for mutation
    extractionMutation.mutate({ fileUrl, fileId, fileExt });
  };

  return (
    <div className="w-full h-auto flex flex-col p-2 gap-1.5 border-2 border-gray-300 rounded-2xl overflow-hidden bg-white dark:bg-[var(--background-dark)] ">
      {/* Header */}
      <div className="w-full h-10 flex p-2 items-center justify-between dark:bg-[var(--tertiary-dark)] border-b-2 dark:rounded-md">
        <CardMoreActions />
        <GreenCheckBox
          checked={selectedUrls.includes(file.url)}
          onChange={() => handleCheckSingle(file.url)}
        />
      </div>

      {/* Row */}
      {/* File name, size, icon */}
      <div className="w-full h-auto p-2 flex flex-row-reverse items-center justify-between">
        <div className="w-auto flex flex-row-reverse items-center gap-2  dark:text-white">
          {/*File ext icon */}
          <FileWithName
            classes={`w-8 h-8 ${fileTypeColorClasses[file.ext] || fileTypeColorClasses.default}`}
            name={file.ext}
          />
          <div className="w-auto flex flex-col items-end">
            {/*File name */}
            <p className="max-w-[150px] truncate text-[0.8rem] ">{file.name}</p>
            {/* Size */}
            <p className="text-[0.7rem] text-gray-300 dark:text-[var(--tertiary)]">
              {file.size > 1024 * 1024
                ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                : `${(file.size / 1024).toFixed(1)} KB`}
            </p>
          </div>
        </div>
        {/* Actions icon */}
        <div className="flex gap-1 items-center">
          {/* Delete */}
          <span
            onClick={handleDeleteFile}
            className="w-auto h-auto p-2 rounded-full cursor-pointer hover:opacity-[0.7] bg-[var(--primary-light)] dark:bg-[var(--primary-dark)]"
          >
            <Bin classes="size-4 text-[var(--primary)]" />
          </span>

          {/* Visit or Extraction */}
          {file.exText ? (
            <span className="w-auto h-auto p-2 rounded-full cursor-pointer hover:opacity-[0.7] bg-[var(--secondary-light)] dark:bg-[var(--secondary-dark)]">
              <Link className="w-full h-full" href={`/files/${file.id}`}>
                <Visit classes="size-4 text-[var(--secondary)]" />
              </Link>
            </span>
          ) : (
            <span
              onClick={handleExtractionText}
              className="w-auto h-auto p-2 rounded-full cursor-pointer hover:opacity-[0.7] bg-[var(--secondary-light)] dark:bg-[var(--secondary-dark)]"
            >
              <Extraction classes="size-4 text-[var(--secondary)]" />
            </span>
          )}
        </div>
      </div>
      {/* Seprated line */}
      <div className="w-[50%] h-[1px] bg-gray-100 self-end dark:bg-[var(--tertiary-dark)]"></div>
      {/* Dates  */}
      <div className="flex flex-col">
        {/*File createAt */}
        <div className="w-full h-auto  p-2 flex  items-center justify-between">
          <div className=" text-start flex text-[0.8rem] text-gray-400 dark:text-[var(--tertiary)] items-center gap-1 min-w-0 ">
            <p>
              {toPersianNumbers(moment(file.createdAt).format("jYYYY/jMM/jDD"))}
            </p>
            <p>{" | "}</p>
            <div className="flex gap-1 items-center ">
              <Clock classes="text-[#cccccc] dark:text-[var(--tertiary)]  size-3 mb-0.5" />
              <p className="text-[0.7rem]">
                {toPersianNumbers(
                  moment(file.createdAt)
                    .utcOffset(3.5 * 60) // تغییر به +03:30
                    .format("HH:mm")
                )}
              </p>
            </div>
          </div>
          <p className="text-[0.8rem] mr-1 dark:text-[var(--tertiary)]">
            بارگذاری
          </p>
        </div>
        {/*File update */}
        <div className="w-full h-auto  p-2 flex  items-center justify-between">
          <div className=" text-start flex text-[0.8rem] text-gray-400 items-center gap-1 min-w-0 dark:text-[var(--tertiary)]">
            <p>
              {toPersianNumbers(moment(file.updatedAt).format("jYYYY/jMM/jDD"))}
            </p>
            <p>{" | "}</p>
            <div className="flex gap-1 items-center ">
              <Clock classes="text-[#cccccc] dark:text-[var(--tertiary)] size-3 mb-0.5" />
              <p className="text-[0.7rem]">
                {toPersianNumbers(
                  moment(file.updatedAt)
                    .utcOffset(3.5 * 60) // تغییر به +03:30
                    .format("HH:mm")
                )}
              </p>
            </div>
          </div>
          <p className="text-[0.8rem] mr-1 dark:text-[var(--tertiary)]">
            ویرایش
          </p>
        </div>
      </div>
    </div>
  );
}
