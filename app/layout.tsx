// app/layout.tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const iranSans = localFont({
  src: "../public/font/Rastin-Circle.ttf",
  variable: "--font-iran-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "زبان ابزار",
  description: "ابزاری برای مدیریت منابع و یادگیری زبان",
  icons: {
    icon: [
      { url: "/Logo.png", sizes: "16x16", type: "image/png" },
      { url: "/Logo.png", sizes: "32x32", type: "image/png" },
      { url: "/Logo.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/Logo.png",
    shortcut: "/Logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Go to theme store for understanding why useing this shpe of theme mode (cookies)
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie?.value || "light";
  return (
    <html lang="fa" className={theme}>
      <body
        className={`${iranSans.variable} ${geistSans.variable} antialiased dark:bg-[var(--tertiary-dark)] bg-[#F9FAFB]`}
      >
        <Providers>
          <div className="w-full h-screen flex flex-row-reverse bg-transparent">
            {/* Nav */}
            <div className="w-[250px] hidden lg:block fixed top-0 right-0 h-screen">
              <Nav />
            </div>
            {/* Content */}
            <div className="lg:mr-[250px] w-full h-full flex flex-col gap-1 p-1">
              <Header />
              {children}
            </div>
          </div>

          <Toaster position="top-center" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
