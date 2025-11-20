import { getFileByIdService } from "@/services/files/getFileByIdService";

export default async function TextBox({ fileId }: { fileId: string }) {
  const file = await getFileByIdService(fileId);

  return (
    <div className="w-full h-auto flex items-center justify-between ">
      <div className="w-full h-auto ms:w-[90%] rounded-md border bg-white dark:bg-[var(--background-dark)] dark:text-white p-3">
        <p className="w-full break-words text-[1rem] whitespace-pre-wrap leading-7">
          {file?.exText}
        </p>
      </div>
    </div>
  );
}
