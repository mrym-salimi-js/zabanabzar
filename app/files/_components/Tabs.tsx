"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

export default function Tabs(): ReactElement {
  const path = usePathname();
  return (
    <div className="w-full h-auto flex flex-row-reverse gap-2 items-center justify-start border-b-2 text-[0.8rem]  text-nowrap dark:text-white  dark:border-b-[var(--tertiary-light)]">
      <Link
        href={"/files/documents"}
        className={`w-18 h-full text-center cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("documents") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        فایل متنی
      </Link>
      <Link
        href={"/files/images"}
        className={`w-18 h-full text-center cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("images") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        تصویر
      </Link>
      <Link
        href={"/files/videos"}
        className={`w-18 h-full text-center cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("videos") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        ویدئو
      </Link>
      <Link
        href={"/files/podcasts"}
        className={`w-18 h-full text-center   cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("podcasts") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        پادکست
      </Link>
      <Link
        href={"/files/texts"}
        className={`w-18 h-full text-center cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("texts") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        متن
      </Link>
    </div>
  );
}
