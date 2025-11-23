import { GreenCheckBox } from "@/components/GreenCheckBox";
import { useDeleteFiles } from "@/hooks/api/files";
import { CheckedFile, FileListResponse } from "@/types/file";
import NameColumn from "./NameColumn";
import CreateAtColumn from "./CreateAtColumn";
import UpdatedAtColumn from "./UpdatedAtColumn";
import ThreePointsLoading from "@/components/ThreePointsLoading";
import { TableMoreActions } from "./TableMoreActions";

// Row props type
type TableRowProps = {
  filesList: FileListResponse;
  checkedFiles: CheckedFile[];
  handleCheckSingle: (file: CheckedFile) => void;
};

// Row
export function FileRow({
  filesList,
  checkedFiles,
  handleCheckSingle,
}: TableRowProps) {
  const deleteMutation = useDeleteFiles();
  return filesList?.map((file, index) => (
    <div
      key={file.id}
      className={`w-full h-12 p-3 text-[0.8rem] border-b ${
        index === filesList?.length - 1 ? "border-b-0" : ""
      } grid ${file.type === "text" ? `grid-cols-[40px_repeat(4,1fr)]` : `grid-cols-[40px_repeat(5,1fr)]`} items-start text-end pb-2 dark:text-[var(--tertiary)]`}
    >
      {/* Checkbox */}
      <GreenCheckBox
        checked={checkedFiles.some((i) => i.id === file.id)}
        onChange={() => handleCheckSingle({ id: file.id, url: file.url })}
      />

      {/* File name and icon */}
      <NameColumn file={file} />
      {/* Created date and time */}
      <CreateAtColumn file={file} />
      {/* Updated date and time */}
      <UpdatedAtColumn file={file} />
      {/* File Size */}
      {file.type !== "text" && (
        <div className="text-start truncate min-w-0">
          {file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${(file.size / 1024).toFixed(1)} KB`}
        </div>
      )}

      {/* Mor actions */}
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
