"use client";
import Image from "next/image";
import Link from "next/link";
export default function Post(props: any) {
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
        <div className="grid content-center items-center gap-[4px] border border-gray-200 bg-white sm:grid-cols-2 md:gap-4">
          <div className="rounded-md bg-black ">
            <Image
              width={230}
              height={230}
              className="h-[229px] max-h-full w-full object-cover"
              src={props.cover ? props.cover : "https://picsum.photos/300/400"}
              // src={"https://picsum.photos/300/400"}
              alt="cover"
            />
          </div>
          <div className="flex flex-col gap-[8px] px-6 py-5">
            <div className="flex shrink-0 flex-row content-center items-center gap-2">
              <Image width={20} height={20} className="h-5 w-5 shrink-0 rounded-sm" src={props.dp} alt="dp" />

              <div className="flex flex-row gap-[2px]">
                <div className="flex flex-1 flex-row content-center items-center gap-1 rounded-lg py-0">
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
                  className="two-line-ellipsis text-lg font-bold md:text-base md:font-semibold "
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
