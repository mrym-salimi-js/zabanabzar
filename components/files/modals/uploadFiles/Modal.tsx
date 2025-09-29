"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReactElement, useState } from "react";
import UploadFilesBtn from "../../UploadFilesBtn";
import ModalHeader from "./ModalHeader";
import FileInfoDesc from "./FileInfoDesc";
import UploadedFilesList from "./UploadedFilesList";
import DropFiles from "./DropFiles";
import ModalFooter from "./ModalFooter";
type UploadedFile = {
  id: number;
  name: string;
  udserId: number;
  url: string;
  size: number;
  type: string;
  originalText: string | null;
  translatedText: string | null;
  subtitleFile: string | null;
  status: string;
  createdAt: Date;
};
export function Modal(): ReactElement {
  const [files, setFiles] = useState<File[]>([]);
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
          <DropFiles files={files} setFiles={setFiles} />
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
