import SettingsBar from "@/components/SettingsBar";
import "../globals.css"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

        <main>
          <section className="relative flex flex-col items-center content-center h-screen mt-10 overflow-hidden md:flex-row-reverse ">

            <div className="w-full mt-0 ">
              <div className="flex-1 w-full px-4 pt-4 md:pt-14 md:px-0 border-x border-x-gray-100 backdrop-blur-md md:border-none">
                {children}
              </div>
            </div>
            <SettingsBar/>

            
          </section>
        </main>
    
  );
}
