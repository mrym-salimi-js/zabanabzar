import { Clock } from "@/components/Icons";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import moment from "moment-jalaali";
type DateAntdTimeProp = {
  date?: string | Date | null;
  label: string;
};

export default function DateAntdTime({ date, label }: DateAntdTimeProp) {
  return (
    <div className="w-full h-auto  p-2 flex  items-center justify-between">
      <div className=" text-start flex text-[0.8rem] text-gray-400 dark:text-[var(--tertiary)] items-center gap-1 min-w-0 ">
        <p>{toPersianNumbers(moment(date).format("jYYYY/jMM/jDD"))}</p>
        <p>{" | "}</p>
        <div className="flex gap-1 items-center ">
          <Clock classes="text-[#cccccc] dark:text-[var(--tertiary)]  size-3 mb-0.5" />
          <p className="text-[0.7rem]">
            {toPersianNumbers(
              moment(date)
                .utcOffset(3.5 * 60) // تغییر به +03:30
                .format("HH:mm")
            )}
          </p>
        </div>
      </div>
      <p className="text-[0.8rem] mr-1 dark:text-[var(--tertiary)]">{label}</p>
    </div>
  );
}
