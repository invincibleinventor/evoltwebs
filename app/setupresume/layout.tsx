import Script from "next/script";
import "../globals.css";
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Evolt - A Modern E-Journal",
  description:
    "Evolt is a modern open source internet journal aimed at empowering authors with content freedom and ownership",
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="noSelect font-poppins">
      <head>
        <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></Script>
      </head>

      <body className="bg-gray-100 bg-cover" lang="en">
        <main>
          <section className="relative m-auto flex hiddenscroll flex-col content-center items-center pb-20 sm:w-screen lg:w-[970px] xl:w-[1200px]">
            
            <div className="w-full mt-0 ">
              <div className="flex items-center content-center w-full px-0 border-x border-x-gray-100 backdrop-blur-md md:border-none">
                {children}
              </div>
            </div>
          
            
          </section>
        </main>
      </body>
    </html>
  );
}
