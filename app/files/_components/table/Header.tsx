import { GreenCheckBox } from "@/components/GreenCheckBox";
import { useFileCheckStore } from "@/store/fileCheckStore";
import { FileListResponse } from "@/types/file";
import { usePathname } from "next/navigation";

type HeaderProp = {
  filesList: FileListResponse;
};
export default function Header({ filesList }: HeaderProp) {
  const checkedFiles = useFileCheckStore((state) => state.CheckedFiles);
  const selectAll = useFileCheckStore((state) => state.selectAll);
  const clearAll = useFileCheckStore((state) => state.clearAll);
  const path = usePathname();
  console.log(path);
  // Handle "select all" checkbox
  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      selectAll(
        filesList.map((file) => {
          return { id: file.id, url: file.url };
        })
      );
    } else {
      clearAll();
    }
  };
  return (
    <div
      className={`w-full h-12 p-3 text-[0.8rem] bg-[var(--tertiary-light)] dark:bg-[var(--tertiary-dark)]
                  grid ${path.includes("texts") ? `grid-cols-[40px_repeat(4,1fr)]` : `grid-cols-[40px_repeat(5,1fr)]`}
                  items-center text-end
                  rounded-tr-[12px] rounded-tl-[12px] dark:text-white`}
    >
      <GreenCheckBox
        checked={checkedFiles?.length === filesList?.length}
        onChange={handleCheckAll}
      />

      <div className="text-start truncate">نام فایل</div>
      <div className="text-start truncate">بارگذاری</div>
      <div className="text-start truncate">ویرایش</div>
      {!path.includes("texts") && (
        <div className="text-start truncate">حجم</div>
      )}

      <div className="text-start truncate">سایر</div>
    </div>
  );
}
