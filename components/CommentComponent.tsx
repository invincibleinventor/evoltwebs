"use client";

import { createClient } from "@/utils/supabase/client";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import Link from 'next/link';
export default function CommentComponent(props: { handle:any; likedbyme: any; likes: any; likedbypeople: any; myhandle: any; comment_id: any; profile: string | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined; time: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined; content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined; loggedin: any; }) {
  const supabase = createClient();
  const [liked, toggleLiked] = useState(props.likedbyme);
  const [likes, setLikes] = useState(props.likes);
  const [disabled, setDisabled] = useState(false);
  async function setLiked(like: boolean) {
    setDisabled(true);
    if (like == false) {
      let l = props.likedbypeople;
      console.log(l);
      l = l.filter(function (item: any) {
        return item !== props.myhandle;
      });
      console.log(l);
      const { error } = await supabase
        .from("comments")
        .update({ liked: l, likes: likes - 1 })
        .eq("comment_id", props.comment_id);
      if (error) {
        alert(error.message);
      } else {
        setLikes(likes - 1);
        toggleLiked(false);
        setDisabled(false);
      }
    } else {
      let l = props.likedbypeople;

      l.push(props.myhandle);
      console.log(l);
      const { error } = await supabase
        .from("comments")
        .update({ liked: l, likes: likes + 1 })
        .eq("comment_id", props.comment_id);

      if (error) {
        alert(error.message);
      } else {
        setLikes(likes + 1);
        toggleLiked(true);
        setDisabled(false);
      }
    }
  }

  return (
    <div className="flex flex-row w-full gap-4 my-2">
      <Link href={`/profile/${props.handle}`} className="w-10 h-10 shrink-0">
        <img className="w-8 h-8 mx-auto my-auto border border-gray-150 shrink-0" src={props.profile} />
      </Link>
      <div className="flex flex-col gap-[2px] w-full">
        <div className="flex flex-row items-center content-center w-full">
          <Link href={`/profile/${props.handle}`} className="text-base font-semibold">{props.name}</Link>
          <h1 className="ml-auto text-sm font-normal">{props.time}</h1>
        </div>
        <h1 className="text-sm font-normal text-gray-800">{props.content}</h1>
        <div className="flex flex-row items-center content-center my-1 mt-2 space-x-[8px]">
          {props.loggedin && (
            <svg
              onClick={() => (!disabled ? (toggleLiked(!liked), setLiked(!liked)) : console.log("hold up!"))}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 48 48"
            >
              {liked ? (
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
                />
              ) : (
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
                />
              )}
            </svg>
          )}
          <h1 className="text-xs">{likes} Likes</h1>
        </div>
      </div>
    </div>
  );
}
