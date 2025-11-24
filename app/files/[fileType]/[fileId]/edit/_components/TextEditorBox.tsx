import { getFileByIdService } from "@/services/files/getFileByIdService";
import Editor from "./Editor";

export async function TextEditorBox({ fileId }: { fileId: string }) {
  const file = await getFileByIdService(fileId);

  return (
    <Editor
      content={file?.exText || file?.textContext}
      fileId={Number(fileId)}
    />
  );
}
