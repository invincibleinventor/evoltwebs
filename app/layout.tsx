import NavBar from "@/components/NavBar";
import Script from "next/script";
import "./globals.css";
import Sidebar from "@/components/SideBar";
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

      <body className="bg-gray-100 bg-cover" lang="en">
        <main>
          <section className="relative m-auto flex h-screen flex-row content-center items-center overflow-hidden sm:w-screen lg:w-[970px] xl:w-[1200px]">
            <NavBar></NavBar>
            <div className="w-full mt-0 ">
              <div className="items-center content-center flex-1 w-full h-screen px-0 border-x border-x-gray-100  backdrop-blur-md md:border-none">
                {children}
              </div>
            </div>
          
            <Sidebar></Sidebar>
            
          </section>
        </main>
      </body>
    </html>
  );
}
