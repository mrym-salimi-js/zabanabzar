import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { deleteAllFilesFromIndexedDB } from "@/lib/indexedDB";
import { deleteFile } from "@/services/deleteFile";
import { useUploadStore } from "@/store/uploadFileStore";
import React, { ReactElement, useRef } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type CleanFileType = {
  name: string;
  size: number;
  url: string | undefined;
  ext: string;
  userId: number;
};

export default function ModalFooter(): ReactElement {
  // Create ref for hidden btn, for using closing modal after sending data
  const closeRef = useRef<HTMLButtonElement>(null);
  const { files, clearFiles } = useUploadStore();

  // Send data mutation
  const mutation = useMutation<void, Error, CleanFileType[]>({
    mutationFn: async (files: CleanFileType[]) => {
      const res = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(files),
      });
      if (!res.ok) throw new Error("خطا در ذخیره فایل‌ها");
      return res.json();
    },
    onSuccess: () => {
      clearFiles();
      deleteAllFilesFromIndexedDB();
      toast.success("فایل‌ها با موفقیت ذخیره شدند");
      // Click on hidden closing btn after sending data
      closeRef.current?.click();
    },
    onError: () => toast.error("ارسال فایل‌ها ناموفق بود"),
  });

  // Clear all uploaded file after click on "انصراف" btn
  const handleClearFiles = () => {
    if (files.length === 0) return;
    files.forEach(async (f) => {
      await deleteFile(f.status, f.id, f.url);
    });
  };

  // Handle events after click on "تایید" btn
  const handleSendData = async () => {
    // Check done status of all files
    const allDone = files.every((f) => f.status === "done");
    if (!allDone) {
      toast.error("خطا! اپلود فایل ها را کامل کنید");
      return;
    }

    // Fix every file structure for drizzle schema
    const cleanFiles = files.map((f) => {
      const parts = f.name.split(".");
      const ext = parts.pop() || "";
      const nameWithoutExt = parts.join(".");

      return {
        name: nameWithoutExt,
        size: f.size,
        url: f.url,
        ext,
        userId: 1,
      };
    });

    if (cleanFiles.length === 0) return;
    // Send cleanFiles into server
    mutation.mutate(cleanFiles);
  };
  return (
    <>
      <DialogClose asChild>
        <button ref={closeRef} className="hidden"></button>
      </DialogClose>

      <DialogFooter className="md:justify-between">
        <DialogClose asChild>
          <Button
            onClick={handleClearFiles}
            variant="outline"
            className="md:w-[50%] border-0 bg-gray-200 items-center dark:bg-[var(--tertiary-dark)] dark:text-white"
          >
            انصراف
          </Button>
        </DialogClose>
        <Button
          onClick={handleSendData}
          variant="outline"
          className="md:w-[50%] border-0 bg-[var(--secondary)] items-center text-white"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              در حال ارسال
            </>
          ) : (
            "تایید"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
