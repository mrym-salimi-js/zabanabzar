import Link from "next/link";
import DateAntdTime from "./DateAntdTime";
import { Bin, Extraction, FileWithName, Visit } from "@/components/Icons";
import { fileTypeColorClasses } from "@/constants/fileTypeColorClasses";
import { useFileCheckStore } from "@/store/fileCheckStore";
import { useDeleteFiles, useExtractionText } from "@/hooks/api/files";
import { useExtractTextStore } from "@/store/extractTextFromFileStore";
import { CheckedFile, FileItem } from "@/types/file";
import { CardMoreActions } from "./CardMoreActions";
import { GreenCheckBox } from "@/components/GreenCheckBox";

// Card props type
type TableRowProps = {
  file: FileItem;
};

// Card
export function FileCard({ file }: TableRowProps) {
  const checkedFiles = useFileCheckStore((state) => state.CheckedFiles);
  const toggleId = useFileCheckStore((state) => state.toggleId);
  const deleteMutation = useDeleteFiles();
  const extractionMutation = useExtractionText();
  const { addExtraction } = useExtractTextStore();

  // Handle card checkbox
  const handleCheckSingle = (checked: CheckedFile) => {
    toggleId(checked);
  };

  // Handle delete file
  const handleDeleteFile = () => {
    deleteMutation.mutate([{ id: file.id, url: file.url }]);
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
        <CardMoreActions fileUrl={file.url} fileId={file.id} />
        <GreenCheckBox
          checked={checkedFiles.some((i) => i.id === file.id)}
          onChange={() => handleCheckSingle({ id: file.id, url: file.url })}
        />
      </div>

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
          {file.exText || file.type === "text" ? (
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
        <DateAntdTime date={file?.createdAt} />
        {/*File update */}
        <DateAntdTime date={file?.updatedAt} />
      </div>
    </div>
  );
}
