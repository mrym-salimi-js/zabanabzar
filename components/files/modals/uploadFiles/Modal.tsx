"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement } from "react";
import ModalHeader from "./ModalHeader";
import UploadedFilesList from "./UploadedFilesList";
import DropFiles from "./DropFiles";
import ModalFooter from "./ModalFooter";
import DDBItem from "@/components/DDBItem";
import { Upload } from "@/components/icon";
import { Button } from "@/components/ui/button";
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
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogTrigger className="w-full">
          <DDBItem icon={Upload} label="آپلود" />
        </DialogTrigger>

        {/*Upload modal */}
        <DialogContent className="sm:max-w-[425px]">
          {/*Modal header */}
          <ModalHeader />
          <div className="w-full h-[1px] bg-gray-100 dark:bg-[var(--tertiary-dark)]"></div>
          {/*Drag and drop file Or choose  */}
          <DropFiles />
          {/*Uploaded files */}
          <UploadedFilesList />
          {/*Modal footer */}
          <ModalFooter />
        </DialogContent>
      </form>
    </Dialog>
  );
}
