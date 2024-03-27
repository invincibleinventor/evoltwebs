"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function Post(props:any) {
  let s = props.description;
  let x = props.name;
  if (x.length >= 11) {
    x = x.slice(0, 4);
    x += "...";
  }
  const a = props.title;

  if (props.type == "profile") {
    if (s.length > 100) {
      s = s.slice(0, 100);
      s += "...";
    }
  } else {
    if (s.length > 147) {
      s = s.slice(0, 147);
      s += "...";
    }
  }
  return (
    <div className="animate-in" >
      <div className="w-full px-5 py-[6px]">
        <div  className="flex flex-col border border-gray-300 rounded-none bg-gray-50 md:gap-0">
          <div  className="flex items-center content-center bg-black rounded-md ">
            <img
           
              className="object-cover aspect-video"
              src={props.cover ? props.cover : "https://picsum.photos/300/400"}
              // src={"https://picsum.photos/300/400"}
              alt="cover"
            />
          </div>
          <div className="flex h-max flex-col gap-[8px] px-6 py-6 ">
            <div className="flex flex-row items-center content-center gap-2 h-max shrink-0">
             <Link className="w-10 h-10" href={`/profile/`+props.handle}>
              <Image width={30} height={30} className="w-10 h-10 rounded-sm shrink-0" src={props.dp} alt="dp" />
             </Link>
              <Link href={`/profile/`+props.handle} className="flex flex-row gap-[2px]">
                <div className="flex flex-col content-center flex-1 gap-[2px] py-0 pl-2 rounded-lg">
                  <div className="flex flex-row items-center content-center">
                  <h1 className="text-sm font-medium text-black "><span className="inline-block md:hidden">{x}</span><span className="hidden md:inline-block">{props.name}</span></h1>
                  <h1 className="ml-2 text-xs font-normal text-gray-600 ">@{props.handle}</h1>

                  </div>
                  <h1 className="text-xs font-medium text-gray-600">{props.time}</h1>

                </div>

              </Link>
              
              <div className="pl-2 ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 16.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"/></g></svg>
              </div>
            </div>

            <div>
              <Link  href={`/post/${props.id}`} className="my-3 mb-[6px] flex w-full flex-row justify-between ">
                <h1
                  style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  className="text-lg font-bold two-line-ellipsis md:text-lg md:font-semibold "
                >
                  {a}
                </h1>
              </Link>

              <h1
                style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                className="four-line-ellipsis text-xs font-normal leading-[20px] text-gray-900 md:text-sm md:leading-[25px]"
              >
                {s}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
