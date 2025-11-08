"use client";
import { ReactElement } from "react";
import {
  Calendar,
  Card,
  Chart,
  Chat,
  Dashboard,
  Folder,
  Logout,
  Setting,
} from "./Icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Logo } from "./Logo";

export default function Nav(): ReactElement {
  const path = usePathname();
  const handleLogout = () => {
    console.log("logout");
  };
  const { theme } = useTheme();

  const navItems = [
    { href: "/dashboard", icon: Dashboard, label: "داشبورد" },
    { href: "/files", icon: Folder, label: "فایل ها" },
    { href: "/flashcards", icon: Card, label: "فلش کارت ها" },
    { href: "/ai-chat", icon: Chat, label: "دستیار" },
    { href: "/calendar", icon: Calendar, label: "روزنگار" },
    { href: "/reports", icon: Chart, label: "گزارش ها" },
  ];
  return (
    <div className="  h-full p-2 dark:bg-[var(--background-dark)] bg-white  border-l-[1px] border-gray-100 z-100">
      <nav className="w-full h-full flex flex-col justify-around items-end p-3.5">
        {/*Logo */}
        <div className="w-full h-auto py-3 border-b">
          <Logo />
        </div>

        {/* Nav midd */}
        <div className="w-full h-[80%] flex flex-col gap-4 items-end pt-2">
          {navItems.map((i, index) => {
            return (
              <Link
                key={index}
                href={i.href}
                className={`w-full h-auto  flex flex-row-reverse gap-2 items-center rounded-[5px]  p-2 cursor-pointer ${
                  path?.includes(i.href)
                    ? `text-[var(--primary)] `
                    : `dark:text-white`
                } ${
                  path?.includes(i.href) &&
                  `dark:bg-[var(--primary-dark)] bg-[var(--primary-light)] `
                }`}
              >
                <i.icon
                  classes={`size-5 ${theme === "dark" ? `stroke-white` : `${path?.includes(i.href) ? `text-[var(--primary)]` : `stroke-black`}`} `}
                />
                <p className={`text-[0.8rem] `}>{i.label}</p>
              </Link>
            );
          })}
        </div>
        {/* Nav end */}
        <div className="w-full  flex flex-col gap-2 items-end relative bottom-0 pt-2 border-t">
          <Link
            href="/"
            className={`w-full h-auto flex flex-row-reverse gap-2 items-center rounded-[5px]  p-2 cursor-pointer  ${
              path?.includes("settings") && `bg-[var(--primary-dark)]`
            }`}
          >
            <Setting
              classes={`size-5 ${path?.includes("settings") ? `text-[var(--primary)]` : `stroke-black`}`}
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
            <Logout classes="size-5 rotate-[180deg] stroke-[var(--primary)]" />
            <p className="text-[var(--primary)] text-[0.8rem]">خروج</p>
          </div>
        </div>
      </nav>
    </div>
  );
}
