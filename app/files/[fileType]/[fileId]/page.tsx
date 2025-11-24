import { use } from "react";
import TextBox from "./_components/TextBox";

export default function FileIdPage({
  params,
}: {
  params: Promise<{ fileId: string }>;
}) {
  const { fileId } = use(params);

  return <TextBox fileId={fileId} />;
}
