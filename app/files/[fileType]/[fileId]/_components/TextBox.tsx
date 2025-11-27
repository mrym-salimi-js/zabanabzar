"use client";
import { getFileByIdService } from "@/services/files/getFileByIdService";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default function TextBox({ fileId }: { fileId: string }) {
  const { data: file, error } = useQuery({
    queryKey: ["file", fileId],
    queryFn: async () => await getFileByIdService(fileId),
  });
  if (error) notFound();

  return (
    <div className="w-full h-auto flex items-center justify-between ">
      <div className="w-full h-auto ms:w-[90%] rounded-md border bg-white dark:bg-[var(--background-dark)] dark:text-white p-3">
        <div
          className="w-full break-words text-[1rem] whitespace-pre-wrap leading-7"
          dangerouslySetInnerHTML={{
            __html: file?.exText || file?.textContent,
          }}
        />
      </div>
    </div>
  );
}
