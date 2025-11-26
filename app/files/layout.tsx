import ToolBar from "@/app/files/_components/toolbar/ToolBar";

export default function FilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-h-[90%] flex flex-col gap-1 ">
      {/* Toolbar Btns */}
      <ToolBar />
      {children}
    </div>
  );
}
