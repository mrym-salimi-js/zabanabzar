import { FileWithName } from "@/components/Icons";
import { fileTypeColorClasses } from "@/constants/fileTypeColorClasses";
import { FileItem } from "@/types/file";

type NameColumnProp = {
  file: FileItem;
};

export default function NameColumn({ file }: NameColumnProp) {
  return (
    <div className="flex truncate gap-1 items-start justify-start min-w-0 dark:text-white">
      <FileWithName
        classes={`w-7 h-7 ${fileTypeColorClasses[file.ext] || fileTypeColorClasses.default}`}
        name={file.type !== "text" ? file.ext : "text"}
      />
      <p className="max-w-[80%] truncate">{file.name}</p>
    </div>
  );
}
