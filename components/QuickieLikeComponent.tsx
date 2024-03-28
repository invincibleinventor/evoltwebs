"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function LikeComponent(props:any) {
  const supabase = createClient();

  const [likedlist, setLikedList] = useState(props.likedlist);
  const [liked, toggleLiked] = useState(props.liked);
  const [ulikedlist, setuLikedList] = useState(props.userliked);
  const [disabled, setDisabled] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  async function setLiked(like: boolean) {
    if (like == false) {
      // let l = likedlist;
      setDisabled(true);

      // l = l.filter(function (item) {
      //   return item !== props.handle;
      // });
      let u = ulikedlist;

      u = u.filter(function (item:any) {
        return item !== props.postid;
      });

      // const { error } = await supabase
      //   .from("posts")
      //   .update({ liked: l, likes: likes - 1 })
      //   .eq("id", props.postid);
      const { error: e } = await supabase.from("user").update({ quickieliked: u }).eq("handle", props.handle);
      if (e) {
        alert(e.message);
      } else {
        toggleLiked(false);

        const { data } = await supabase.from("quickies").select("liked").eq("id", props.postid);
        if (data) {
          setLikedList(data[0]["liked"]);
          const { data: d } = await supabase.from("user").select("quickieliked").eq("handle", props.handle);
          if (d) {
            setuLikedList(d[0]["quickieliked"]);
            setDisabled(false);

            setLikes(likes - 1);
          }
        }
      }
    } else {
      const l = likedlist;
      setDisabled(true);
      l.push(props.handle);
      const u = ulikedlist;
      u.push(props.postid);
      console.log(l);
      const { error: e } = await supabase.from("user").update({ quickieliked: u }).eq("handle", props.handle);
      const { error } = await supabase
        .from("quickies")
        .update({ liked: l, likes: likes + 1 })
        .eq("id", props.postid);

      if (error || e) {
        alert(error!.message);
        alert(e!.message);
      } else {
        const { data } = await supabase.from("quickies").select("liked").eq("id", props.postid);
        if (data) {
          setLikedList(data[0]["liked"]);
          const { data: d } = await supabase.from("user").select("quickieliked").eq("handle", props.handle);
          if (d) {
            setuLikedList(d[0]["quickieliked"]);
          }
          setDisabled(false);
          setLikes(likes + 1);
          toggleLiked(true);
        }
      }
    }
  }
  return (
    <div className="flex flex-row content-center items-center ml-auto space-x-[8px]  ">
      <svg
        onClick={() => (!disabled ? (toggleLiked(!liked), setLiked(!liked)) : console.log("holdup"))}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 48 48"
      >
        {liked ? (
          <path
            fill="red"
            stroke="red"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
          />
        ) : (
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
          />
        )}
      </svg>

      <h1 className="text-xs md:text-sm">{likes}</h1>
    </div>
  );
}
