"use client";
import Image from "next/image";
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
        <div  className="flex flex-col bg-gray-50 border border-gray-300 rounded-none  md:gap-0">
          <div  className="flex items-center content-center bg-black rounded-md aspect-video">
            <Image
            width={1000}
            height={420}
              className="aspect-video"
              src={props.cover ? props.cover : "https://picsum.photos/300/400"}
              // src={"https://picsum.photos/300/400"}
              alt="cover"
            />
          </div>
          <div className="flex h-max flex-col gap-[8px] px-6 py-6 ">
            <div className="flex flex-row items-center content-center gap-2 h-max shrink-0">
              <Image width={20} height={20} className="w-5 h-5 rounded-sm shrink-0" src={props.dp} alt="dp" />

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
              <div className="my-2 mb-[6px] flex w-full flex-row justify-between ">
                <h1
                  style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  className="text-lg font-bold two-line-ellipsis md:text-base md:font-semibold "
                >
                  {a}
                </h1>
              </div>

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
    </Link>
  );
}
