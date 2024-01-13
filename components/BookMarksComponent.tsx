"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function BookMarksComponent(props) {
  const supabase = createClient();
  const [likedlist, setLikedList] = useState(props.likedlist);

  const [liked, toggleLiked] = useState(props.liked);
  const [ulikedlist, setuLikedList] = useState(props.userliked);
  const [disabled, setDisabled] = useState(false);

  async function setLiked(like: boolean) {
    if (like == false) {
      let l = likedlist;
      console.log(l);
      setDisabled(true);

      l = l.filter(function (item) {
        return item !== props.handle;
      });
      let u = ulikedlist;

      u = u.filter(function (item) {
        return item !== props.postid;
      });

      console.log(l);
      const { error: e } = await supabase.from("user").update({ bookmarks: u }).eq("handle", props.handle);

      const { error } = await supabase.from("posts").update({ bookmarked: l }).eq("id", props.postid);
      if (error || e) {
        alert(error!.message);
        alert(e!.message);
      } else {
        const { data } = await supabase.from("posts").select("bookmarked").eq("id", props.postid);
        if (data) {
          setLikedList(data[0]["bookmarked"]);
          toggleLiked(false);
          const { data: d } = await supabase.from("user").select("bookmarks").eq("handle", props.handle);
          if (d) setuLikedList(d[0]["bookmarks"]);
          setDisabled(false);
        }
      }
    } else {
      const l = likedlist;
      setDisabled(true);

      l.push(props.handle);
      const u = ulikedlist;
      u.push(props.postid);
      console.log(l);
      const { error: e } = await supabase.from("user").update({ bookmarks: u }).eq("handle", props.handle);

      const { error } = await supabase.from("posts").update({ bookmarked: l }).eq("id", props.postid);

      if (error || e) {
        alert(error!.message);
        alert(e!.message);
      } else {
        const { data } = await supabase.from("posts").select("bookmarked").eq("id", props.postid);
        if (data) {
          setLikedList(data[0]["bookmarked"]);
          toggleLiked(true);
          const { data: d } = await supabase.from("user").select("bookmarks").eq("handle", props.handle);
          if (d) setuLikedList(d[0]["bookmarks"]);
          setDisabled(false);
        }
      }
    }
  }
  return (
    <div
      onClick={() => (!disabled ? (toggleLiked(!liked), setLiked(!liked)) : console.log("holdup"))}
      className="flex cursor-pointer flex-row content-center items-center  space-x-[8px] px-6  pr-0"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        {liked ? (
          <path fill="currentColor" d="M17 3H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2" />
        ) : (
          <path fill="currentColor" d="m17 18l-5-2.18L7 18V5h10m0-2H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2" />
        )}
      </svg>

      <h1 className="hidden text-sm md:inline-block">Bookmark</h1>
    </div>
  );
}
