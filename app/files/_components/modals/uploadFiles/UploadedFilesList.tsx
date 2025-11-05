import { Bin, FileWithName, Retry } from "@/components/Icons";
import React, { ReactElement } from "react";
import { ProgressBar } from "./ProgressBar";
import { useUploadStore, UploadFilePersist } from "@/store/uploadFileStore";
import { deleteFile } from "@/services/deleteFile";
import { uploadFile } from "@/services/uploadFile";

export default function UploadedFilesList(): ReactElement {
  const { files } = useUploadStore();

  const handleRemoveFile = async (file: UploadFilePersist) => {
    const status = file.status;
    const id = file.id;
    const fileUrl = file.url;

    await deleteFile(status, id, fileUrl);
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
                        <div className="flex gap-1  text-[0.6rem]">
                          <p className="text-gray-400">
                            {file.size < 1024 * 1024
                              ? (file.size / 1024).toFixed(1) + " KB"
                              : (file.size / (1024 * 1024)).toFixed(1) + " MB"}
                          </p>
                          <p className="text-gray-400">{" | "}</p>
                          {file.status === "uploading" && (
                            <p className="text-yellow-500 ">
                              {`uploading (${file.progress}%)`}
                            </p>
                          )}
                          {file.status === "done" && (
                            <p className="text-[var(--secondary)] ">
                              {"complete"}
                            </p>
                          )}
                          {file.status === "error" && (
                            <p className="text-[var(--primary)] ">{"error"}</p>
                          )}
                        </div>
                      </div>
                      {file.status === "error" && (
                        <div
                          onClick={() => uploadFile(file.id)}
                          className="w-5 h-5 flex items-center justify-center rounded-full cursor-pointer hover:opacity-[0.7] mr-2"
                        >
                          <Retry size="size-4 " color="var(--tertiary) " />
                        </div>
                      )}
                      <div onClick={() => handleRemoveFile(file)}>
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
