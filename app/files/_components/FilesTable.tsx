import { ReactElement } from "react";
import { Clock, FileWithName } from "@/components/Icons";
import { TableMoreActions } from "./TableMoreActions";
import { GreenCheckBox } from "@/components/GreenCheckBox";
import { FileListResponse } from "@/app/types/file";
import moment from "moment-jalaali";
import { fileTypeColorClasses } from "@/constants/fileTypeColorClasses";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import FilesTableSkeleton from "@/components/skeletons/FilesTableSkeleton";
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
  // console.log(fileList);
  return (
    <div dir="rtl" className="w-full h-auto p-1 md:flex flex-col gap-1 hidden">
      {/* Table header */}
      <div
        className="w-full h-12 p-3 text-[0.8rem] bg-[var(--tertiary-light)]  dark:bg-[var(--tertiary-dark)]   
              grid grid-cols-[40px_repeat(5,1fr)]
              items-center text-end
              rounded-tr-[12px] rounded-tl-[12px] dark:text-white"
      >
        {/*Checkbox */}
        <GreenCheckBox />

        {/*Others */}
        <div className="text-start truncate">نام فایل</div>
        <div className="text-start truncate">بارگذاری</div>
        <div className="text-start truncate">ویرایش</div>
        <div className="text-start truncate">حجم</div>
        <div className="text-start truncate">سایر</div>
      </div>
      {isLoading ? (
        <FilesTableSkeleton skeletonCount={6} />
      ) : (
        <FileRow filesList={filesList} />
      )}
    </div>
  );
}
// Row props type
type TableRowProps = {
  filesList: FileListResponse;
};

//Row
export function FileRow({ filesList }: TableRowProps) {
  return filesList?.map((file) => {
    return (
      <>
        {/* Table row */}
        <div
          className="w-full h-12 p-3 text-[0.8rem] border-b
            grid grid-cols-[40px_repeat(5,1fr)]
            items-start text-end pb-2 dark:text-[var(--tertiary)]"
        >
          {/*Checkbox */}
          <GreenCheckBox />
          {/*Others */}
          <div className="flex truncate gap-1 items-start justify-start min-w-0 dark:text-white">
            <FileWithName
              classes={`w-7 h-7 ${fileTypeColorClasses[file.ext] || fileTypeColorClasses.default}`}
              name={file.ext}
            />
            <p className="max-w-[80%] truncate"> {file.name}</p>
          </div>
          <div className=" text-start flex flex-col  min-w-0 ">
            <p>
              {toPersianNumbers(moment(file.createdAt).format("jYYYY/jMM/jDD"))}
            </p>
            <div className="flex gap-1 items-center">
              <Clock classes="text-[#cccccc] dark:text-[var(--tertiary)]   size-3 mb-0.5" />
              <p className="text-[0.7rem] text-gray-300 dark:text-[var(--tertiary)]">
                {toPersianNumbers(
                  moment(file.createdAt)
                    .utcOffset(3.5 * 60) // تغییر به +03:30
                    .format("HH:mm")
                )}
              </p>
            </div>
          </div>
          <div className=" text-start flex flex-col min-w-0 ">
            <p>
              {toPersianNumbers(moment(file.createdAt).format("jYYYY/jMM/jDD"))}
            </p>
            <div className="flex gap-1 items-center">
              <Clock classes="text-[#cccccc] dark:text-[var(--tertiary)]   size-3 mb-0.5" />
              <p className="text-[0.7rem] text-gray-300 dark:text-[var(--tertiary)]">
                {toPersianNumbers(
                  moment(file.updatedAt)
                    .utcOffset(3.5 * 60) // تغییر به +03:30
                    .format("HH:mm")
                )}
              </p>
            </div>
          </div>
          <div className="text-start truncate min-w-0 ">
            {file.size > 1024 * 1024
              ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
              : `${(file.size / 1024).toFixed(1)} KB`}
          </div>
          <div className="text-start truncate  min-w-0 cursor-pointer hover:opacity-[0.7]">
            <TableMoreActions />
          </div>
        </div>
      </>
    );
  });
}
