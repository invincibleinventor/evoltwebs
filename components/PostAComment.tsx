"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function PostAComment(props:any) {
  const supabase = createClient();
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement | any>(null);

  const [posted, setPosted] = useState(false);
  async function post() {
    const { error } = await supabase.from("comments").insert({ content: text, id: props.postid });
    if (error) {
      console.log(error.message);
    } else {
      setPosted(true);
      inputRef.current!.value = "";
    }
  }
  return (
    <div className="mb-3 mt-6 flex flex-row space-x-4 px-2">
      <Image width={32} height={32} src={props.myphoto} className="h-8 w-8 shrink-0" alt="myphoto" />
      <textarea
        required
        minLength={5}
        maxLength={100}
        onKeyDown={(e) => {
          if (e.key === "Enter") post();
        }}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        className="w-full border px-4 py-2 outline-none focus:border-gray-700"
        placeholder={"Post a comment publicly as " + props.myname}
      ></textarea>
      <div className={!posted ? "hidden" : "w-full px-5 py-4 text-xs"}>
        <h1>Posted</h1>
      </div>
    </div>
  );
}
