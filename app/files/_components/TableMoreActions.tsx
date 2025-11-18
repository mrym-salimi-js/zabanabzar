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
import DDBItem from "./toolbar/DDBItem";
import { useDeleteFiles, useExtractionText } from "@/hooks/api/files";
import { useExtractTextStore } from "@/store/extractTextFromFileStore";

type MorActionProp = {
  fileUrl: string;
  fileId: number;
  fileEx: string | null;
};

export function TableMoreActions({ fileUrl, fileId, fileEx }: MorActionProp) {
  const deleteMutation = useDeleteFiles();
  const extractionMutation = useExtractionText();
  const { addExtraction } = useExtractTextStore();

  // Handle delete file
  const handleDeleteFile = () => {
    deleteMutation.mutate([fileUrl]);
  };

  // Handle extraction text from file
  const handleExtractionText = () => {
    const fileName = fileUrl.split(`/`)[4];
    addExtraction(fileId, fileName, undefined);

    // We can sen one argument for mutation
    extractionMutation.mutate({ fileUrl, fileId });
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
            {fileEx ? (
              <DDBItem
                // handleAction={handleExtractionText}
                icon={Visit}
                label="متن"
              />
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
          <DropdownMenuItem className="justify-end p-0">
            {/* Edit */}
            {/* <DDBItem icon={Edit} label="ویرایش" /> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-end p-0">
            {/* Download */}
            {/* <DDBItem icon={Download} label="دانلود" /> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
