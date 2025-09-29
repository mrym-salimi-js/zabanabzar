import { Bin, FileWithName } from "@/components/icon";
import React, { ReactElement } from "react";
import { ProgressBar } from "./ProgressBar";

export default function UploadedFilesList(): ReactElement {
  return (
    <div className="w-full h-auto p-2 flex flex-col items-end gap-2">
      <p className="dark:text-white text-[0.8rem]">فایل های اپلود شده</p>
      <div className="w-full h-24 overflow-hidden overflow-y-scroll p-1">
        <ul className="w-full flex flex-col gap-2 p-0 m-0">
          <li className="w-full h-18 rounded-[12px] border p-3 flex flex-col gap-2 ">
            <div className="w-full flex gap-2 items-center">
              <FileWithName size="w-8 h-8" color="red" name="PDF" />
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex justify-between items-center">
                  <div className="w-full flex flex-col ">
                    <p className="w-[80%] truncate dark:text-white text-[0.7rem]">
                      new-file.pdf
                    </p>
                    <p className=" text-gray-400 text-[0.6rem]">8.3 mg | 34%</p>
                  </div>
                  <Bin
                    size="size-4 cursor-pointer hover:opacity-[0.7]"
                    color="var(--tertiary) "
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-1 ">
              <ProgressBar />
            </div>
          </li>
          <li className="w-full h-18 rounded-[12px] border p-3 flex flex-col gap-2 ">
            <div className="w-full flex gap-2 items-center">
              <FileWithName size="w-8 h-8" color="red" name="PDF" />
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex justify-between items-center">
                  <div className="w-full flex flex-col ">
                    <p className="w-[80%] truncate dark:text-white text-[0.7rem]">
                      new-file.pdf
                    </p>
                    <p className=" text-gray-400 text-[0.6rem]">8.3 mg | 34%</p>
                  </div>
                  <Bin
                    size="size-4 cursor-pointer hover:opacity-[0.7]"
                    color="var(--tertiary) "
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-1 ">
              <ProgressBar />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
