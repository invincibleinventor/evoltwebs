import "./globals.css";
import SideBar from "@/components/SideBar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import NavBar from "@/components/NavBar";
import Loading from "@/app/loading";
import { Suspense } from "react";
import Script from "next/script";
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Evolt - A Modern E-Journal",
  description:
    "Evolt is a modern open source internet journal aimed at empowering authors with content freedom and ownership",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="noSelect font-poppins">
      <head>
        <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></Script>
      </head>

      <body className="bg-white bg-cover" lang="en">
        <main>
          <section className="relative h-screen md:w-[810px] sm:w-screen lg:w-[770px] xl:w-[1000px] my-auto mx-auto items-center content-center overflow-hidden flex flex-row">
            <NavBar></NavBar>
            <div className="w-full mt-0 ">
              <div className="items-center content-center flex-1 w-full h-screen px-0 border-x border-x-neutral-100 md:border-none bg-opacity-80 filter backdrop-blue-md overflow-y-scoll">
                {children}
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
