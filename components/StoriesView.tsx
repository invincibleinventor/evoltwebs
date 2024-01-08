"use client";
import Image from "next/image";
import { useState } from "react";
export default function StoriesView(props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-row px-0 pt-0">
      <div
        onClick={() => setVisible(!visible)}
        style={{ background: `url('${props.image}')` }}
        className="relative h-32 w-24 rounded-md bg-gradient-to-b from-black to-current"
      >
        <h1 className="absolute bottom-2 left-3 text-xs font-medium text-white">{props.name}</h1>
        <Image
          width={32}
          height={32}
          className="absolute left-3 top-2 h-8 w-8 rounded-full border border-white"
          src={props.profile}
          alt="story"
        />
      </div>
    </div>
  );
}
