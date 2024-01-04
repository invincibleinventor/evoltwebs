"use client";
import Link from "next/link";
export default function Post(props:any) {
  let s = props.description;

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
    <Link className="animate-in" href={`/post/${props.id}`}>
      <div className="w-full px-5 py-[6px]">
        <div className="grid items-center content-center gap-[4px] bg-white border border-gray-150 md:gap-4 sm:grid-cols-2">
          <div className="bg-black rounded-md ">
            <img
              className="object-cover w-full max-h-full h-[229px]"
              src={props.cover ? props.cover + "?" + new Date().getTime() : "https://picsum.photos/300/400"}
            ></img>
          </div>
          <div className="flex flex-col    gap-[8px] px-6 py-5">
            <div className="flex flex-row items-center content-center gap-2 shrink-0">
              <img className="w-5 h-5 rounded-sm shrink-0" src={props.dp}></img>

              <div className="flex flex-row gap-[2px]">
                <div className="flex flex-row items-center content-center flex-1 gap-1 py-0 rounded-lg">
                  <h1 className="text-xs font-medium text-black ">{props.name}</h1>
                  <h1 className="text-xs font-normal text-gray-600 ">@{props.handle}</h1>
                </div>
              </div>
              <div className="ml-auto">
                {" "}
                <h1 className="text-xs font-normal text-gray-600">{props.time}</h1>
              </div>
            </div>

            <div>
              <div className="flex flex-row w-full justify-between my-2 mb-[6px] ">
                <h1
                  style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  className="text-lg font-bold two-line-ellipsis md:text-base md:font-semibold "
                >
                  {a}
                </h1>
              </div>

              <h1
                style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                className="text-xs font-normal leading-[20px] four-line-ellipsis text-gray-900 md:leading-[25px] md:text-sm"
              >
                {s}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
