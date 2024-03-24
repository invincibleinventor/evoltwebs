import SettingsBar from "@/components/SettingsBar";
import "../globals.css"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

        <main>
          <section className="relative flex flex-row items-center content-center h-screen mt-10 overflow-hidden ">
          <SettingsBar/>

            <div className="w-full mt-0 ">
              <div className="flex-1 w-full h-screen px-4 pt-4 md:pt-20 md:px-0 border-x border-x-gray-100 backdrop-blur-md md:border-none">
                {children}
              </div>
            </div>
          
            
          </section>
        </main>
    
  );
}
