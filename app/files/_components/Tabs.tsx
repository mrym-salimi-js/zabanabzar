import Link from "next/link";
import { ReactElement } from "react";

export default function Tabs(): ReactElement {
  return (
    <div className="w-full h-auto  flex flex-row-reverse gap-2 items-center justify-start border-b-2 text-[0.8rem]  text-nowrap dark:text-white border-b-[var(--tertiary)] dark:border-b-[var(--tertiary-light)]">
      <Link
        href={"/files/documents"}
        className="w-22 h-full text-center border-b-2 !border-[var(--primary)] cursor-pointer hover:opacity-[0.7] p-2 text-[var(--primary)]"
      >
        فایل متنی
      </Link>
      <Link
        href={"/files/images"}
        className="w-22 h-full text-center cursor-pointer hover:opacity-[0.7] p-2 "
      >
        تصویر
      </Link>
      <Link
        href={"/files/videos"}
        className="w-22 h-full text-center cursor-pointer hover:opacity-[0.7] p-2 "
      >
        ویدئو
      </Link>
      <Link
        href={"/files/poscasts"}
        className="w-22 h-full text-center cursor-pointer hover:opacity-[0.7] p-2 "
      >
        پادکست
      </Link>
      <Link
        href={"/files/texts"}
        className="w-22 h-full text-center cursor-pointer hover:opacity-[0.7] p-2 "
      >
        متن
      </Link>
    </div>
  );
}
