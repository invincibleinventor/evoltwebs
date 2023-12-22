'use client';
import { usePathname } from "next/navigation";
import Headeritem from "@/components/HeaderItem"
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function App$(){
  const loc = usePathname()
    return(
      <div className={`md:w-[420px]  h-screen flex flex-col py-0 px-0 md:pr-0 items-start ${loc.startsWith('/post/')?"hidden md:flex":""}`}>
      <Link className="flex flex-row mt-1" href="/">
    <svg className="w-[51px] mt-[2px] ml-[6px] mr-2 md:mr-0 md:ml-[4px] transition-all ease-linear duration-100 hover:bg-gray-200  cursor-pointer rounded-full p-[10px] h-[51px] text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>
     </Link>
     <div className="py-4 pt-[14px] flex flex-col space-y-1">
     <Headeritem  link="/" url={<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M6.133 21C4.955 21 4 20.02 4 18.81v-8.802c0-.665.295-1.295.8-1.71l5.867-4.818a2.09 2.09 0 0 1 2.666 0l5.866 4.818c.506.415.801 1.045.801 1.71v8.802c0 1.21-.955 2.19-2.133 2.19z"/><path d="M9.5 21v-5.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V21"/></g>} name="Home"></Headeritem>
     <Headeritem  link="/explore" url={<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M19.27 16.202A7.812 7.812 0 0 1 12.06 21c-4.313 0-7.81-3.492-7.81-7.8S5.89 7.13 8.455 3c4.806 2.1 4.806 8.4 4.806 8.4s1.579-3.038 4.806-4.5c1.035 3.042 2.43 6.365 1.203 9.302"/><path d="M12 18a5 5 0 0 1-5-5"/></g>} name="Explore"></Headeritem>
     <Headeritem link="/notifications" url={<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M18.831 10.256c0-3.701-2.46-7.256-6.813-7.256s-6.813 3.555-6.813 7.256c0 1.502-.988 2.654-1.818 3.859c-3.73 5.971 20.807 5.703 17.262 0c-.83-1.205-1.818-2.357-1.818-3.859"/><path d="M8.643 18.368C9.272 19.92 10.07 21 12 21c1.929 0 2.728-1.08 3.357-2.632"/></g>} name="Notifications"></Headeritem>
     <Headeritem  link="/messages" url={<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11v-.5m4 .5v-.5M8 11v-.5m-4.536 6.328C2 15.657 2 14.771 2 11c0-3.771 0-5.657 1.464-6.828C4.93 3 7.286 3 12 3c4.714 0 7.071 0 8.535 1.172C22 5.343 22 7.229 22 11c0 3.771 0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96"/>} name="Messages"></Headeritem>
     <Headeritem link="/bookmarks"  url={<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.527 20.841C6.861 21.274 6 20.772 6 19.952V3.942c0-.52.336-.942.75-.942h10.5c.414 0 .75.422.75.942v16.01c0 .82-.861 1.322-1.527.89l-3.946-2.562a.962.962 0 0 0-1.054 0l-3.946 2.56Z"/>} name="Bookmarks"></Headeritem>
     <Headeritem link="/myself"  url={<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><circle cx="12" cy="9.1" r="2.5"/><circle cx="12" cy="12" r="9"/><path d="M17 19.2c-.317-6.187-9.683-6.187-10 0"/></g>} name="Profile"></Headeritem>
     <Headeritem link="/more" url={<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M12 12.25v-.5m4 .5v-.5m-8 .5v-.5"/><circle cx="12" cy="12" r="9"/></g>} name="More"></Headeritem>
     <Link href="/create" className="pt-5">
     <div className="flex flex-row rounded-lg md:rounded-lg  md:w-[calc(220px)]  mx-auto md:mr-auto  md:py-[14px] p-3 w-[52px] h-[52px] bg-black transition-all ease-linear duration-100 cursor-pointer hover:bg-black items-center content-center">
        <span className={`text-white md:inline-block hidden text-sm text-center mx-auto  font-semibold pt-[0px]`}>New Post</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="md:hidden w-[22px] h-[22px] text-white mx-auto my-auto" style={{fill:'white'}}><g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g></svg>
      </div>
      </Link>
    
     </div>
     
     </div>
       
    )
}
