"use client";
import { ReactElement } from "react";
import { Dashboard, Logout, Setting, Upload } from "./icon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Nav(): ReactElement {
  const path = usePathname();
  const handleLogout = () => {
    console.log("logout");
  };
  const { theme } = useTheme();

  const navItems = [
    { href: "/dashboard", icon: Dashboard, label: "داشبورد" },
    { href: "/files", icon: Upload, label: "اپلود فایل" },
  ];
  return (
    <div className="w-[90%] sm:w-55  h-full p-2 sticky top-0 bg-white dark:bg-[var(--background-dark)]  border-l-[1px] border-gray-100">
      <nav className="w-full h-full flex flex-col justify-around p-2">
        {/*Logo */}
        <div className="w-full h-16  flex flex-row-reverse gap-2 items-center ">
          <Image
            alt="زبان ابزار"
            src="/Logo.png"
            width={30}
            height={30}
            priority
          />
          <h1 className="dark:text-white"> زبان ابزار</h1>
        </div>

        {/* Nav midd */}
        <div className="w-full h-[80%] flex flex-col gap-3 items-end pt-2">
          {navItems.map((i, index) => {
            return (
              <Link
                key={index}
                href={i.href}
                className={`w-full h-auto flex flex-row-reverse gap-2 items-center rounded-[5px]  p-2 cursor-pointer ${
                  path?.includes(i.href) &&
                  `dark:bg-[var(--primary-dark)] bg-[var(--primary-light)] `
                }`}
              >
                <i.icon
                  size="size-5 "
                  color={theme !== "dark" ? `#000000` : `#ffffff`}
                  fill={path?.includes(i.href) ? `var(--primary)` : false}
                />
                <p
                  className={`text-[#000000]  text-[0.8rem] ${
                    path?.includes(i.href)
                      ? `text-[var(--primary)] `
                      : `dark:text-white`
                  }`}
                >
                  {i.label}
                </p>
              </Link>
            );
          })}
        </div>
        {/* Nav end */}
        <div className="w-full  flex flex-col gap-2 items-end relative bottom-0 border-t border-gray-100">
          <Link
            href="/"
            className={`w-full h-auto flex flex-row-reverse gap-2 items-center rounded-[5px]  p-2 cursor-pointer  ${
              path?.includes("settings") && `bg-[var(--primary-dark)]`
            }`}
          >
            <Setting
              size="size-5 "
              color={theme !== "dark" ? `#000000` : `#ffffff`}
              fill={path?.includes("settings") ? `var(--primary)` : false}
            />
            <p
              className={`text-[#000000]  text-[0.8rem] ${
                path?.includes("settings")
                  ? `text-[var(--primary)] `
                  : `dark:text-white`
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
