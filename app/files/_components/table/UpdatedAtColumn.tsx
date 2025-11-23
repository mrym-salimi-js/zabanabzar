import { Clock } from "@/components/Icons";
import { FileItem } from "@/types/file";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import moment from "moment-jalaali";

type UpdatedAtColumnProp = {
  file: FileItem;
};
export default function UpdatedAtColumn({ file }: UpdatedAtColumnProp) {
  return (
    <div className="text-start flex flex-col min-w-0">
      <p>{toPersianNumbers(moment(file.createdAt).format("jYYYY/jMM/jDD"))}</p>
      <div className="flex gap-1 items-center">
        <Clock classes="text-[#cccccc] dark:text-[var(--tertiary)] size-3 mb-0.5" />
        <p className="text-[0.7rem] text-gray-300 dark:text-[var(--tertiary)]">
          {toPersianNumbers(
            moment(file.createdAt)
              .utcOffset(3.5 * 60)
              .format("HH:mm")
          )}
        </p>
      </div>
    </div>
  );
}
