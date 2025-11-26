import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bin,
  Download,
  Edit,
  Extraction,
  More,
  Visit,
} from "@/components/Icons";
import DDBItem from "@/app/files/_components/toolbar/DDBItem";
import {
  useDeleteFiles,
  useDownloadFile,
  useExtractionText,
} from "@/hooks/api/files";
import { useExtractTextStore } from "@/store/extractTextFromFileStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MorActionProp = {
  fileUrl: string;
  fileId: number;
  fileEx: string | null;
  fileExt: string;
};

export function TableMoreActions({
  fileUrl,
  fileId,
  fileEx,
  fileExt,
}: MorActionProp) {
  const deleteMutation = useDeleteFiles();
  const extractionMutation = useExtractionText();
  const { addExtraction } = useExtractTextStore();
  const downloadMutation = useDownloadFile();
  const path = usePathname();

  // Handle delete file
  const handleDeleteFile = () => {
    deleteMutation.mutate([{ id: fileId, url: fileUrl }]);
  };

  // Handle extraction text from file
  const handleExtractionText = () => {
    const fileName = fileUrl.split(`/`)[4];
    addExtraction(fileId, fileName, undefined);

    // We can sen one argument for mutation
    extractionMutation.mutate({ fileUrl, fileId, fileExt });
  };

  const handleDownloadFile = () => {
    downloadMutation.mutate([{ id: fileId, url: fileUrl }]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <More classes="size-6 text-black dark:text-[var(--tertiary)]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-auto rounded-xl p-2 dark:bg-[var(--tertiary-dark)] dark:text-white"
        align="start"
      >
        <DropdownMenuGroup className=" flex flex-col">
          <DropdownMenuItem className="justify-end p-0 ">
            {/* Visit or Extraction */}
            {fileEx || !fileUrl ? (
              <Link className="w-full" href={`${path}/${fileId}`}>
                <DDBItem icon={Visit} label="متن" />
              </Link>
            ) : (
              <DDBItem
                handleAction={handleExtractionText}
                icon={Extraction}
                label="استخراج"
              />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Delete */}
            <DDBItem handleAction={handleDeleteFile} icon={Bin} label="حذف" />
          </DropdownMenuItem>
          {fileEx && (
            <DropdownMenuItem className="justify-end p-0">
              {/* Edit */}
              <Link className="w-full" href={`${path}/${fileId}/edit`}>
                <DDBItem icon={Edit} label="ویرایش" />
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="justify-end p-0">
            {/* Download */}
            <DDBItem
              handleAction={handleDownloadFile}
              icon={Download}
              label="دانلود"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
