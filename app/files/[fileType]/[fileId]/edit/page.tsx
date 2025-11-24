import { use } from "react";
import { TextEditorBox } from "./_components/TextEditorBox";

export default function EditPage({
  params,
}: {
  params: Promise<{ fileId: string }>;
}) {
  const { fileId } = use(params);

  return <TextEditorBox fileId={fileId} />;
}
