"use client";
import Headeritem from "@/components/HeaderItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const loc = usePathname();
  return (
    <div className="mb-auto xl:ml-6 lg:block hidden lg:w-[400px]">
      <div className={`  flex w-max flex-col items-start p-0 md:pr-0 ${loc.startsWith("/post/") ? "md:flex" : ""}`}>
       
        <div className="flex flex-col space-y-1 py-4 pt-[14px] md:mt-[calc(17*4px)] md:space-y-[0px] md:bg-gray-100 md:px-4 md:pt-[4px]">
          <h1 className="font-semibold">Suggested Users</h1>
        </div>
      </div>
    </div>
  );
}
