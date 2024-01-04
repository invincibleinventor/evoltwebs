"use client";
import { Oval } from "react-loader-spinner";
import PostComponent from "@/components/PostComponent";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { redirect, useRouter } from "next/navigation";
import More from "@/components/More";
export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const supabase = createClient();
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [loggedin, setloggedin] = useState(false);
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const [postloading, setPostLoading] = useState(true);
  const [cover, setCover] = useState("true");
  const [name, setName] = useState("");
  const [following, setFollowing] = useState(0);
  const [imfollowing, setImFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [followerlist, setFollowerList] = useState<any>([]);
  const [followinglist, setFollowingList] = useState<any>([]);
  const [found, setFound] = useState(true);
  const [myself, setMyself] = useState(false);
  const [myId, setMyId] = useState<string | any>();
  useEffect(() => {
    async function get() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setloggedin(true);
      }
      const { data: pd, error: pe } = await supabase.from("user").select("*").eq("handle", params.slug);
      if (pe || pd.length == 0) {
        setFound(false);
        setAbout("That user does not exist or you do not have access to view their profile");
        setLoading(false);
      } else {
        if (pd.length > 0) {
          {
            setFound(true);
            setName(pd[0].name);
            setCover(pd[0].cover);
            setAbout(pd[0].about);
            setImage(pd[0].image);
            setFollowers(pd[0].followers.length);
            setFollowing(pd[0].following.length);

            if (session) {
              const { data, error } = await supabase.from("user").select("*").eq("id", session.user.id);
              if(data){
              setMyId(data[0].handle);
              setFollowerList(pd[0].followers);
              setFollowingList(data[0].following);
              if (data[0].handle == params.slug) {
                setMyself(true);
              } else if (pd[0].followers.includes(data[0].handle)) {
                setImFollowing(true);
              } else {
                setImFollowing(false);
              }
            }
            } else {
            }
          }
        }
      }
    }
    get();
  }, [imfollowing]);

  TimeAgo.locale(en);

  const timeAgo = new TimeAgo("en-US");
  const date1 = new Date();
  useEffect(() => {
    async function get() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("handle", params.slug)
        .order("id", { ascending: false })
        .limit(5);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        let ds:any = data;
        for await (const [index, post] of ds.entries()) {
          const { data, error } = await supabase.from("user").select("*").eq("id", post.poster);
          if(data){
          ds[index].name = data[0].name;

          ds[index].dp = data[0].image;

          let date2 = new Date(ds[index].created_at);
          ds[index].diff = date1.getTime() - date2.getTime();
        }
      }
        setPosts(ds);
        setLoading(false);
      }
    }
    get();
  }, []);
  async function onfollow() {
    if (myself) {
      router.push("/customize");
    } else {
      if (followerlist.includes(myId)) {
        console.log("uesuesues");
        let arr = followerlist;
        console.log("before");
        console.log(arr);
        arr = arr.filter((item: any) => item !== myId);
        let arr2 = followinglist;
        arr2 = arr2.filter((item: string) => item !== params.slug);

        console.log(arr);
        const { data, error } = await supabase
          .from("user")
          .update({ followers: arr })
          .eq("handle", params.slug)
          .select();
        const { data: me, error: mee } = await supabase
          .from("user")
          .update({ following: arr2 })
          .eq("handle", myId)
          .select();
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
        setFollowerList(arr);
        setFollowingList(arr2);
        setImFollowing(false);
      } else {
        let arr = followerlist;
        arr.push(myId);
        let arr2 = Array();
        arr2 = followinglist;
        arr2.push(params.slug);
        console.log(arr);
        const { data, error } = await supabase
          .from("user")
          .update({ followers: arr })
          .eq("handle", params.slug)
          .select();
        const { data: me, error: mee } = await supabase
          .from("user")
          .update({ following: arr2 })
          .eq("handle", myId)
          .select();
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
  }
  return !loading ? (
    <div className="flex-1 h-screen p-0 overflow-x-hidden overflow-y-hidden">
      <div className="h-full pb-10 overflow-y-scroll hiddenscroll">
        <div className="relative h-64">
          <div className="bg-gray-200 h-48 w-[calc(100%)-8px]  m-4 ">
            {cover && (
              <img
                src={found ? (cover ? cover + "?" + new Date().getTime() : "/bg.jpg") : "/bg.jpg"}
                className="object-cover w-full h-48 "
              ></img>
            )}
          </div>
          <img
            className="absolute w-24 h-24 bottom-5 md:left-12 left-7"
            src={found ? image : "/usernotfound.png"}
          ></img>
          {found && loggedin && (
            <button
              onClick={() => onfollow()}
              className={`absolute  text-xs font-semibold bottom-10 md:right-12 right-6 px-8 py-3  ${
                !(imfollowing || myself)
                  ? "bg-black text-white border-1 border-black"
                  : "bg-white text-black border border-black"
              }`}
            >
              {myself ? "Edit Profile" : imfollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 ml-8 md:ml-14">
          {found && (
            <div className="flex flex-row items-center content-center gap-2 ">
              <h1 className="text-xl font-semibold">{name}</h1>
              <h1 className="text-sm font-normal text-neutral-400">@{params.slug}</h1>
            </div>
          )}
          <h1 className="pr-12 text-sm font-normal leading-relaxed text-neutral-400">{about}</h1>
        </div>
        {found && (
          <>
            <div className="flex flex-row items-center content-center gap-6 px-4 py-4 mx-8 my-4 mb-1 border md:mx-14 border-neutral-700">
              <div className="flex flex-row w-full md:mx-auto">
                <div className="flex flex-col items-center content-center gap-1 mx-auto w-max">
                  <h1 className="text-xs font-semibold">Followers</h1>
                  <h1 className="text-sm font-medium text-gray-700">{followers} Followers</h1>
                </div>
                <div className="flex flex-col items-center content-center gap-1 mx-auto w-max">
                  <h1 className="text-xs font-semibold">Following</h1>
                  <h1 className="text-sm font-medium text-gray-700">{following} Following</h1>
                </div>
              </div>
            </div>
            <h1 className="px-8 mt-8 mb-4 text-xl font-bold md:mt-10 md:mb-4 md:px-14 ">{name}'s Posts</h1>
            <div className="flex flex-col gap-2 px-3 md:px-9">
              {!loading ? (
                posts.length > 0 ? (
                  posts.map((post) => (
                    <PostComponent
                      id={post["id"]}
                      type="profile"
                      title={post["title"]}
                      cover={post["cover"]}
                      time={timeAgo.format(Date.now() - post["diff"])}
                      key={post["id"]}
                      image={post["image"]}
                      dp={post["dp"]}
                      handle={post["handle"]}
                      name={post["name"]}
                      description={post["excerpt"]}
                    />
                  ))
                ) : (
                  <>
                    <h1 className="px-[22px] text-sm font-medium text-gray-700">
                      No Posts To Display. {name} haven't posted anything yet.
                    </h1>
                  </>
                )
              ) : (
                <div className="flex flex-col items-center content-center mt-10">
                  <Oval
                    height={80}
                    width={80}
                    color="#000000"
                    wrapperStyle={{}}
                    wrapperClass="mx-auto"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#808080"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              )}
              <More handle={params.slug} />
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="flex items-center content-center w-full h-screen">
      <Oval
        height={80}
        width={80}
        color="#000000"
        wrapperStyle={{}}
        wrapperClass="mx-auto"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#808080"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
