import { Bin, FileWithName, Retry } from "@/components/icon";
import React, { ReactElement } from "react";
import { ProgressBar } from "./ProgressBar";
import { useUploadStore } from "@/store/uploadFileStore";

export default function UploadedFilesList(): ReactElement {
  const { files, removeFile } = useUploadStore();
  const handleRemoveFile = async (
    index: number,
    fileUrl: string | undefined
  ) => {
    if (files[index].status === "error") removeFile(index);
    if (!fileUrl) return;
    try {
      const res = await fetch("/api/upload/storage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl }),
      });
      console.dir(res);
      // Throw erorr
      if (!res.ok) throw new Error("حذف سرور موفق نبود");
      // Remove from localStorage
      removeFile(index);
    } catch (error) {
      console.error("خطا در حذف فایل از S3:", error);
    }
  };
  return (
    <div className="w-full h-auto p-2 flex flex-col items-end gap-2">
      <p className="dark:text-white text-[0.8rem]">فایل های اپلود شده</p>
      <div className="w-full h-24 overflow-hidden overflow-y-scroll p-1">
        <ul className="w-full flex flex-col gap-2 p-0 m-0">
          {files.map((file, index) => {
            return (
              <li
                key={index}
                className="w-full h-18 rounded-[12px] border p-3 flex flex-col gap-2 "
              >
                <div className="w-full flex gap-2 items-center">
                  <FileWithName size="w-8 h-8" color="red" name="PDF" />
                  <div className="w-full flex flex-col gap-1">
                    <div className="w-full flex justify-between items-center">
                      <div className="w-full flex flex-col ">
                        <p className="w-[80%] truncate dark:text-white text-[0.7rem]">
                          {file.name}
                        </p>
                        <p
                          className={` ${file.status === "error" ? `text-[var(--primary)]` : `text-gray-400`} text-[0.6rem]`}
                        >
                          {file.size < 1024 * 1024
                            ? (file.size / 1024).toFixed(1) + " KB"
                            : (file.size / (1024 * 1024)).toFixed(1) + " MB"}
                          {" | "}
                          {file.status === "error"
                            ? "erorr"
                            : `${file.progress}%`}
                        </p>
                      </div>
                      {file.status === "error" && (
                        <div className="w-5 h-5 flex items-center justify-center rounded-full cursor-pointer hover:opacity-[0.7] mr-2">
                          <Retry size="size-4 " color="var(--tertiary) " />
                        </div>
                      )}
                      <div onClick={() => handleRemoveFile(index, file.url)}>
                        <Bin
                          size="size-4 cursor-pointer hover:opacity-[0.7]"
                          color="var(--tertiary) "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-1 ">
                  <ProgressBar percent={file?.progress} status={file?.status} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
