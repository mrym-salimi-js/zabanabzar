"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement } from "react";
import ModalHeader from "./ModalHeader";
import UploadedFilesList from "./UploadedFilesList";
import DropFiles from "./DropFiles";
import ModalFooterProcess from "./ModalFooterProcess";
import DDBItem from "@/app/files/_components/toolbar/DDBItem";
import { Upload } from "@/components/Icons";
// type UploadedFile = {
//   name: string;
//   size: number;
//   udserId: number;
//   exText: string | null;
//   url: string;
//   ext: string;
// };
export function Modal(): ReactElement {
  return (
    <Dialog>
      <form className="w-full">
        {/*Upload Btn */}

        <DialogTrigger className="w-full">
          <DDBItem icon={Upload} label="آپلود" />
        </DialogTrigger>

        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          {/*Modal header */}
          <ModalHeader />
          <div className="w-full h-[1px] bg-gray-100 dark:bg-[var(--tertiary-dark)]"></div>
          {/*Drag and drop file Or choose  */}
          <DropFiles />
          {/*Uploaded files */}
          <UploadedFilesList />
          {/*Modal footer */}
          <ModalFooterProcess />
        </DialogContent>
      </form>
    </Dialog>
  );
}
