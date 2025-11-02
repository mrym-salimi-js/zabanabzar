"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReactElement } from "react";
import UploadFilesBtn from "../../UploadFilesBtn";
import ModalHeader from "./ModalHeader";
import FileInfoDesc from "./FileInfoDesc";
import UploadedFilesList from "./UploadedFilesList";
import DropFiles from "./DropFiles";
import ModalFooter from "./ModalFooter";
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
      <form>
        {/*Upload Btn */}
        <UploadFilesBtn />
        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/*Modal header */}
          <ModalHeader />
          <div className="w-full h-[1px] bg-gray-100 dark:bg-[var(--tertiary-dark)]"></div>
          {/*Drag and drop file Or choose  */}
          <DropFiles />
          {/*File Info desc */}
          <FileInfoDesc />
          {/*Uploaded files */}
          <UploadedFilesList />
          {/*Modal footer */}
          <ModalFooter />
        </DialogContent>
      </form>
    </Dialog>
  );
}
