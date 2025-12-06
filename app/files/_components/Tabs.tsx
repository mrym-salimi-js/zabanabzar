"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

export default function Tabs(): ReactElement {
  const path = usePathname();
  return (
    <div className="w-full h-auto flex flex-row-reverse gap-2 items-center justify-start border-b-2 text-[0.8rem]  text-nowrap dark:text-white  dark:border-b-[var(--tertiary-light)]">
      <Link
        href={"/files/document"}
        className={`w-18 h-full text-center cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("document") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        فایل متنی
      </Link>
      <Link
        href={"/files/image"}
        className={`w-18 h-full text-center cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("image") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        تصویر
      </Link>
      <Link
        href={"/files/video"}
        className={`w-18 h-full text-center cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("video") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        ویدئو
      </Link>
      <Link
        href={"/files/podcast"}
        className={`w-18 h-full text-center   cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("podcast") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        پادکست
      </Link>
      <Link
        href={"/files/text"}
        className={`w-18 h-full text-center cursor-pointer hover:opacity-[0.7] p-2  ${path.includes("text") ? `text-[var(--primary)] border-b-[2px] !border-[var(--primary)]` : ``}`}
      >
        متن
      </Link>
    </div>
  );
}
