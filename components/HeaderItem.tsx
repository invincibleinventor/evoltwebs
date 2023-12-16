'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
interface pros {
    url?: any,
    name: string,
    link?: string,
}



export default function App (props:pros) {
    const loc = usePathname()
   let a = {'opened': false}

    if(loc==props.link){
        console.log(props.link)
        a.opened=true
    }
    else if(props.link=='/myself' && loc.startsWith('/profile'){
        a.opened=true
    }
    else{
        console.log('')
    }
    

    return(
        <Link href={link} className={`flex flex-row rounded-full px-3 md:px-[14px] md:pr-8 w-max md:w-full py-[10px] mx-2 md:mx-0 md:space-x-[16px] rounded-lg transition-all ease-linear duration-100 cursor-pointer items-center content-center  ${a.opened?'':''}`}>
  <svg className={`w-[30px] stroke-2 p-[2px] text-black h-[30px] ${a.opened?'text-red-500':'text-black'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">{props.url}</svg>
    <span className={`text-black text-lg md:inline-block hidden font-poppins ${a.opened?'font-medium text-red-400':'font-normal'} pt-[0px]`}>{props.name}</span>
  </Link>
    )
}
