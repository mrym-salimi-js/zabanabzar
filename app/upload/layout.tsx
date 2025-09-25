import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import localFont from "next/font/local";
import { Logout, Setting, Upload } from "@/components/icon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const iranSans = localFont({
  src: "../../public/font/Rastin-Circle.ttf",
  variable: "--font-iran-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "زبان ابزار",
  description: "ابزاری برای مدیریت منابع و یادگیری زبان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={`${iranSans.variable}${geistSans.variable} antialiased`}>
        <div className="w-full h-screen flex flex-row-reverse gap-0.5 bg-[#f7f7f7e6]">
          {/* Nav */}
          <div className="w-[90%] sm:w-55  h-full p-2 sticky top-0 bg-white">
            <nav className="w-full h-full flex flex-col justify-around p-2">
              <div className="w-full h-auto flex justify-end ">زبان ابزار</div>

              {/* Nav midd */}
              <div className="w-full h-[80%] flex flex-col gap-3 items-end pt-6">
                <div className="w-full h-auto flex flex-row-reverse gap-2 items-center cursor-pointer rounded-[4px] bg-[var(--za-light-red)] p-2">
                  <Upload size="size-5" color="#343434" />
                  <p className="text-[#343434] text-[0.8rem]">آپلود</p>
                </div>
              </div>
              {/* Nav end */}
              <div className="w-full  flex flex-col gap-6 items-end relative bottom-0">
                <div className="w-full h-auto flex flex-row-reverse gap-2 items-center cursor-pointer rounded-[4px]">
                  <Setting size="size-5" color="#343434" />
                  <p className="text-[#343434]   text-[0.8rem]">تنظیمات</p>
                </div>
                <div className="w-full h-auto flex flex-row-reverse gap-2 items-center cursor-pointer rounded-[4px]">
                  <Logout size="size-5" color="var(--za-red)" />
                  <p className="text-[var(--za-red)] text-[0.8rem]">خروج</p>
                </div>
              </div>
            </nav>
          </div>
          {/* Content */}
          <div className="w-[80.9%] h-full p-0.5 flex flex-col gap-1 ">
            <header className="w-full h-24 flex bg-white rounded-[4px]"></header>
            {/* {children} */}
          </div>
        </div>
      </body>
    </html>
  );
}
