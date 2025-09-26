"use client";
import { ReactElement } from "react";
import { Logout, Setting, Upload } from "./icon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Nav(): ReactElement {
  const path = usePathname();
  const handleLogout = () => {
    console.log("logout");
  };
  return (
    <div className="w-[90%] sm:w-55  h-full p-2 sticky top-0 bg-white border-l-[1px] border-gray-100">
      <nav className="w-full h-full flex flex-col justify-around p-2">
        {/*Logo */}
        <div className="w-full h-16  flex flex-row-reverse gap-2 items-center ">
          <Image
            alt="زبان ابزار"
            src="/Logo.webp"
            width={30}
            height={30}
            priority
          />
          <h1> زبان ابزار</h1>
        </div>

        {/* Nav midd */}
        <div className="w-full h-[80%] flex flex-col gap-3 items-end pt-2">
          <Link
            href="/dashboard"
            className={`w-full h-auto flex flex-row-reverse gap-2 items-center rounded-[5px]  p-2 cursor-pointer hover:border-r-2 ${
              path?.includes("dashboard") && `bg-[var(--primary-light)]`
            }`}
          >
            <Upload
              size="size-5"
              color="#343434"
              fill={path?.includes("dashboard") ? `var(--primary)` : false}
            />
            <p
              className={`text-[#343434] text-[0.8rem] ${
                path?.includes("dashboard") && `text-[var(--primary)]`
              }`}
            >
              داشبورد
            </p>
          </Link>
          <Link
            href="/upload"
            className={`w-full h-auto flex flex-row-reverse gap-2 items-center rounded-[5px]  p-2 cursor-pointer ${
              path?.includes("upload") && `bg-[var(--primary-light)]`
            }`}
          >
            <Upload
              size="size-5"
              color="#343434"
              fill={path?.includes("upload") ? `var(--primary)` : false}
            />
            <p
              className={`text-[#343434] text-[0.8rem] ${
                path?.includes("upload") && `text-[var(--primary)]`
              }`}
            >
              آپلود فایل
            </p>
          </Link>
        </div>
        {/* Nav end */}
        <div className="w-full  flex flex-col gap-2 items-end relative bottom-0 border-t border-gray-100">
          <Link
            href="/settings"
            className="w-full h-auto flex flex-row-reverse gap-2 items-center cursor-pointer rounded-[5px] p-2"
          >
            <Setting
              size="size-5"
              color="#343434"
              fill={path?.includes("settings") ? `var(--primary)` : false}
            />
            <p
              className={`text-[#343434] text-[0.8rem] ${
                path?.includes("settings") && `text-[var(--primary)]`
              }`}
            >
              تنظیمات
            </p>
          </Link>
          <div
            onClick={handleLogout}
            className="w-full h-auto flex flex-row-reverse gap-2 items-center cursor-pointer rounded-[5px] p-2"
          >
            <Logout size="size-5 rotate-[180deg]" color="var(--primary)" />
            <p className="text-[var(--primary)] text-[0.8rem]">خروج</p>
          </div>
        </div>
      </nav>
    </div>
  );
}
