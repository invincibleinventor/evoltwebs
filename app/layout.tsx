import NavBar from "@/components/NavBar";
import Script from "next/script";
import "./globals.css";
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
          <section className="relative m-auto flex h-screen flex-row content-center items-center overflow-hidden sm:w-screen md:w-[810px] lg:w-[770px] xl:w-[1000px]">
            <NavBar></NavBar>
            <div className="mt-0 w-full ">
              <div className="h-screen w-full flex-1 content-center items-center border-x border-x-gray-100 bg-white/80 px-0 backdrop-blur-md md:border-none">
                {children}
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
