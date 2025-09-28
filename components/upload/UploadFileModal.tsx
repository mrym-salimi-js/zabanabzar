"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement } from "react";
import { Bin, FileWithName, Upload } from "../icon";
import { useTheme } from "next-themes";
import { ProgressBar } from "./ProgressBar";
import FilePicker from "@/components/upload/FilePicker";

export function UploadFileModal(): ReactElement {
  const { theme } = useTheme();
  return (
    <Dialog>
      <form>
        {/*Upload Btn */}
        <DialogTrigger asChild>
          <span className="w-auto h-auto py-3 px-4 flex gap-2 hover:opacity-[0.7] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--primary)]">
            <Upload size="size-5" color="#ffffff" fill="#ffffff" />
            <p className="text-white text-[0.8rem] ">اپلود</p>
          </span>
        </DialogTrigger>
        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/*Modal header */}
          <DialogHeader className="gap-3 items-end">
            <div className="flex gap-3 items-center">
              <DialogTitle className="text-end text-sm dark:text-white">
                اپلود فایل جدید
              </DialogTitle>

              <Upload
                size="size-5"
                color="#ffffff"
                fill={theme === "dark" ? "#ffffff" : "#000000"}
              />
            </div>

            <DialogDescription className="text-end text-[0.8rem] text-gray-400">
              میتونی یک یا چند فایل اپلود کنی
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-[1px] bg-gray-100 dark:bg-[var(--tertiary-dark)]"></div>
          {/*Drag and drop file Or choose  */}
          <div className="w-full h-38 flex flex-col items-center justify-center gap-2 rounded-[12px] border-[2px] border-dashed !border-[var(--primary)]">
            <Upload size="size-9" color="#000000" fill="var(--primary)" />
            <p className=" text-[0.8rem] dark:text-white">بکش و رها کن یا</p>
            <FilePicker />
          </div>
          {/*File Info desc */}
          <div className="w-full h-auto flex gap-1 items-center justify-end p-2  border-b-[1px] border-gray-100 ">
            <p className="text-end text-[0.8rem] text-gray-400">
              فقط فرمت های pdf، png، jpg
            </p>
            <p className="text-end text-[0.8rem] text-gray-400 ">
              10 MG حداکثر حجم فایل
            </p>
          </div>
          {/*Uploaded files */}
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
                          <p className=" text-gray-400 text-[0.6rem]">
                            8.3 mg | 34%
                          </p>
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
                          <p className=" text-gray-400 text-[0.6rem]">
                            8.3 mg | 34%
                          </p>
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
          {/*Modal footer */}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-0 bg-gray-200 items-center dark:bg-[var(--tertiary-dark)] dark:text-white"
              >
                انصراف
              </Button>
            </DialogClose>
            <Button
              variant="outline"
              className="border-0 bg-[var(--secondary)] items-center text-white"
            >
              تایید
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
