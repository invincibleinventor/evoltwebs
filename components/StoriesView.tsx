"use client";
import Stories from "react-insta-stories";
import { useState } from "react";
export default function StoriesView(props:any) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-row px-0 pt-0">
      <div
        onClick={() => setVisible(!visible)}
        style={{ background: `url('${props.image}')` }}
        className="relative w-24 h-32 rounded-md bg-gradient-to-b from-black to-neutral-400"
      >
        <h1 className="absolute text-xs font-medium text-white bottom-2 left-3">{props.name}</h1>
        <img className="absolute w-8 h-8 border border-white rounded-full top-2 left-3" src={props.profile}></img>
      </div>
    </div>
  );
}
