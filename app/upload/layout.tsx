import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Header from "@/components/Header";

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
  icons: {
    icon: [
      { url: "/Logo2.webp", sizes: "16x16", type: "image/webp" },
      { url: "/Logo2.webp", sizes: "32x32", type: "image/webp" },
      { url: "/Logo2.webp", sizes: "48x48", type: "image/webp" },
    ],
    apple: "/Logo2.webp", // برای آیفون/آیپد
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={`${iranSans.variable}${geistSans.variable} antialiased`}>
        <div className="w-full h-screen flex flex-row-reverse gap-0.5 bg-white">
          {/* Nav */}
          <Nav />
          {/* Content */}
          <div className="w-[85.3%] h-full  flex flex-col gap-1 ">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
