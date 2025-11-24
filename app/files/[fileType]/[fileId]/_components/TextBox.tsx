import { getFileByIdService } from "@/services/files/getFileByIdService";
import { notFound } from "next/navigation";

export default async function TextBox({ fileId }: { fileId: string }) {
  const file = await getFileByIdService(fileId);
  if (!file) notFound();

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
