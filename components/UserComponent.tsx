"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function UserComponent(props:any) {
  const supabase = createClient();

  const [myId] = useState(props.myID);

  async function onfollow(handle:any) {
    if (imfollowing) {
      console.log("uesuesues");
      let arr = followerlist;
      console.log("before");
      console.log(arr);
      arr = arr.filter((item:any) => item !== myId);
      let arr2 = followinglist;
      arr2 = arr2.filter((item:any) => item !== handle);

      console.log(arr);
      const { data, error } = await supabase.from("user").update({ followers: arr }).eq("handle", handle).select();
      // const { data: me, error: mee } = await supabase
      //   .from("user")
      //   .update({ following: arr2 })
      //   .eq("handle", myId)
      //   .select();
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
      setFollowerList(arr);
      setFollowingList(arr2);
      setImFollowing(false);
    } else {
      const arr = followerlist;
      arr.push(myId);
      const arr2 = followinglist;
      arr2.push(handle);
      console.log(arr);
      const { data, error } = await supabase.from("user").update({ followers: arr }).eq("handle", handle).select();
      // const { data: me, error: mee } = await supabase
      //   .from("user")
      //   .update({ following: arr2 })
      //   .eq("handle", myId)
      //   .select();
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
      setImFollowing(true);
      setFollowerList(arr);
      setFollowingList(arr2);
    }
  }
  const [imfollowing, setImFollowing] = useState(props.isfollowing);
  const [followerlist, setFollowerList] = useState(props.followerlist);
  const [followinglist, setFollowingList] = useState(props.followinglist);
  let a = props.name;
  if (a.length >= 11) {
    a = a.slice(0, 7);
    a += "...";
  }
  return (
    <Link
      href={"/profile/" + props.handle}
      className="mx-auto my-2 flex h-[270.29px] w-[303.86px] flex-col border border-gray-100 p-6 xl:mx-2 xl:w-auto"
    >
      <div className="flex flex-row content-center items-center justify-between">
        <div className="flex flex-row content-center items-center space-x-5">
          <Image width={40} height={40} src={props.image} className="h-10 w-10 object-cover" alt="profile-pic" />
          <div className="flex flex-col space-y-[1px]">
            <h1 className="text-base font-bold">{a}</h1>
            <h1 className="text-xs font-normal">@{props.handle}</h1>
          </div>
        </div>
        <button
          onClick={(e) => (e.stopPropagation(), e.preventDefault(), onfollow(props.handle))}
          className={
            imfollowing
              ? "h-max border border-black bg-white px-5 py-2 text-xs text-black"
              : "h-max border border-black bg-black px-5 py-2 text-xs text-white"
          }
        >
          {imfollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div className="mx-0 my-6 mb-4 flex flex-row content-center items-center gap-6 border border-gray-800 p-4">
        <div className="flex w-full flex-row md:mx-auto">
          <div className="mx-auto flex w-max flex-col content-center items-center gap-1">
            <h1 className="text-xs font-semibold">Followers</h1>
            <h1 className="text-sm font-medium text-gray-700">{props.followers} Followers</h1>
          </div>
          <div className="mx-auto flex w-max flex-col content-center items-center gap-1">
            <h1 className="text-xs font-semibold">Following</h1>
            <h1 className="text-sm font-medium text-gray-700">{props.following} Following</h1>
          </div>
        </div>
      </div>
      <div className="mt-0 w-full px-[2px]">
        <h1 className="fix-overflow four-line-ellipsis text-sm">{props.about}</h1>
      </div>
    </Link>
  );
}
