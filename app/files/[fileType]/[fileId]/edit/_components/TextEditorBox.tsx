"use client";
import { getFileByIdService } from "@/services/files/getFileByIdService";
import Editor from "./Editor";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export function TextEditorBox({ fileId }: { fileId: string }) {
  const { data: file, error } = useQuery({
    queryKey: ["file", fileId],
    queryFn: async () => await getFileByIdService(fileId),
  });
  if (error) notFound();

  return (
    <Editor
      content={file?.exText || file?.textContext}
      fileId={Number(fileId)}
    />
  );
}
