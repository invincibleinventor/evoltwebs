"use client";
import More from "@/components/More";
import PostComponent from "@/components/PostComponent";
import { createClient } from "@/utils/supabase/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const supabase = createClient();
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [loggedin, setloggedin] = useState(false);
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
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
              const { data } = await supabase.from("user").select("*").eq("id", session.user.id);
              if (data) {
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
        const ds: any = data;
        for await (const [index, post] of ds.entries()) {
          const { data } = await supabase.from("user").select("*").eq("id", post.poster);
          if (data) {
            ds[index].name = data[0].name;

            ds[index].dp = data[0].image;

            const date2 = new Date(ds[index].created_at);
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
        let arr2 = [];
        arr2 = followinglist;
        arr2.push(params.slug);
        console.log(arr);
        const { data, error } = await supabase
          .from("user")
          .update({ followers: arr })
          .eq("handle", params.slug)
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
    <div className="h-screen flex-1 overflow-hidden p-0">
      <div className="hiddenscroll h-full overflow-y-scroll pb-10">
        <div className="relative h-64">
          <div className="m-4 h-48 w-[calc(100%)-8px]  bg-gray-200 ">
            {cover && (
              <Image
                width={180}
                height={180}
                src={found ? (cover ? cover : "/bg.jpg") : "/bg.jpg"}
                className="h-48 w-full object-cover "
                alt="cover"
              />
            )}
          </div>
          <Image
            width={90}
            height={90}
            className="absolute bottom-5 left-7 h-24 w-24 md:left-12"
            src={found ? image : "/usernotfound.png"}
            alt="userimage"
          />
          {found && loggedin && (
            <button
              onClick={() => onfollow()}
              className={`absolute  bottom-10 right-6 px-8 py-3 text-xs font-semibold md:right-12  ${
                !(imfollowing || myself)
                  ? "border-[1px] border-black bg-black text-white"
                  : "border border-black bg-white text-black"
              }`}
            >
              {myself ? "Edit Profile" : imfollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="ml-8 flex flex-col gap-2 md:ml-14">
          {found && (
            <div className="flex flex-row content-center items-center gap-2 ">
              <h1 className="text-xl font-semibold">{name}</h1>
              <h1 className="text-sm font-normal text-gray-400">@{params.slug}</h1>
            </div>
          )}
          <h1 className="pr-12 text-sm font-normal leading-relaxed text-gray-400">{about}</h1>
        </div>
        {found && (
          <>
            <div className="mx-8 my-4 mb-1 flex flex-row content-center items-center gap-6 border border-gray-700 p-4 md:mx-14">
              <div className="flex w-full flex-row md:mx-auto">
                <div className="mx-auto flex w-max flex-col content-center items-center gap-1">
                  <h1 className="text-xs font-semibold">Followers</h1>
                  <h1 className="text-sm font-medium text-gray-700">{followers} Followers</h1>
                </div>
                <div className="mx-auto flex w-max flex-col content-center items-center gap-1">
                  <h1 className="text-xs font-semibold">Following</h1>
                  <h1 className="text-sm font-medium text-gray-700">{following} Following</h1>
                </div>
              </div>
            </div>
            <h1 className="mb-4 mt-8 px-8 text-xl font-bold md:mb-4 md:mt-10 md:px-14 ">{name}&apos;s Posts</h1>
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
                      No Posts To Display. {name} haven&apos;t posted anything yet.
                    </h1>
                  </>
                )
              ) : (
                <div className="mt-10 flex flex-col content-center items-center">
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
    <div className="flex h-screen w-full content-center items-center">
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
