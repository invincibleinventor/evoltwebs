"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function App(props:any) {
  const loc = usePathname();
  const a = { opened: false };

  if (loc == props.link) {
    console.log(props.link);
    a.opened = true;
  } else if (props.link == "/myself" && loc.startsWith("/profile")) {
    a.opened = true;
  } else if (props.link == "/myself" && loc == "/customize") {
    a.opened = true;
  } else {
    console.log("");
  }

  return (
    <Link
      href={props.link}
      className={`mx-2 flex w-max cursor-pointer flex-row content-center items-center  px-3 py-[10px] transition-all bg-gray-50 md:bg-transparent border border-gray-200 h-[calc(13*4px)] md:h-max md:border-none md:rounded-none  duration-100 ease-linear md:mx-0 md:w-full md:space-x-[10px] md:px-[6px] md:py-[8px] md:pr-8  ${
        a.opened ? "" : ""
      }`}
    >
      <svg
        className={`h-[26px] w-[26px] stroke-[2px] p-[2px] text-black ${a.opened ? "text-black" : "text-gray-600"}`}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        {props.url}
      </svg>
      <span
        className={`font-pops hidden text-sm text-black md:inline-block ${
          a.opened ? "font-medium text-black" : "font-normal text-gray-600"
        } pt-[0px]`}
      >
        {props.name}
      </span>
    </Link>
  );
}
