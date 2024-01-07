"use client";
import MoreBookMarks from "@/components/MoreBookMarks";
import PostComponent from "@/components/PostComponent";
import { createClient } from "@/utils/supabase/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
export default function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };
  TimeAgo.locale(en);
  const [search, setSearch] = useState(params.slug);
  const [tempsearch, setTempSearch] = useState("");
  const timeAgo = new TimeAgo("en-US");
  const date1 = new Date();
  const isSupabaseConnected = canInitSupabaseClient();
  const [empty, setEmpty] = useState(true);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function get() {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();
      const s = user?.user?.id;
      const { data: u } = await supabase.from("user").select("*").eq("id", s);
      let l = [];
      if (u) {
        l = u[0]["bookmarks"];
      }
      console.log("below");
      console.log(l);
      let ds = [];

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: false })
        .textSearch("title_excerpt_content", `'${search}' | '${search.toLowerCase()}' | '${search.toUpperCase()}'`)
        .in("id", l)
        .limit(5);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        ds = data;

        for await (const [index, post] of ds.entries()) {
          const { data } = await supabase.from("user").select("*").eq("id", post.poster);
          if (data) {
            ds[index].name = data[0].name;
            const date2 = new Date(ds[index].created_at);
            ds[index].diff = date1.getTime() - date2.getTime();
            ds[index].dp = data[0].image;
          }
        }
        if (ds.length > 0) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
        setPosts(ds);
        setLoading(false);

        console.log(ds);
        console.log(posts);
      }
    }
    get();
  }, [search]);
  if (isSupabaseConnected) {
    return (
      <div className="h-screen flex-1 overflow-hidden p-0 py-2">
        <div className="mx-1 p-4 py-2 md:mx-1">
          <div className="relative content-center items-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className=" absolute inset-y-0 my-auto ml-6 h-[18px] w-[18px] text-black"
            >
              <g>
                <path
                  fill="currentColor"
                  d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
                ></path>
              </g>
            </svg>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (tempsearch != "") {
                    setSearch(tempsearch);
                  } else {
                    setEmpty(true);
                  }
                }
              }}
              defaultValue={search}
              onChange={(e: any) => setTempSearch(e.target.value.trim())}
              minLength={4}
              maxLength={50}
              type="search"
              className="font-poppins peer h-12 w-full border border-gray-200 bg-white pl-14 pr-8 text-[14px] placeholder:text-gray-600 focus:bg-white focus:outline-black"
              placeholder={"Search Posts"}
            ></input>
          </div>
        </div>
        <div className="hiddenscroll h-full overflow-y-scroll">
          <div className="animate-in hiddenscroll mb-20 flex flex-col gap-2">
            {!loading ? (
              !empty ? (
                posts.map(
                  (post: {
                    id: any;
                    title: any;
                    diff: number;
                    image: any;
                    dp: any;
                    handle: any;
                    cover: any;
                    name: any;
                    excerpt: any;
                  }) => (
                    <PostComponent
                      id={post.id}
                      title={post.title}
                      time={timeAgo.format(Date.now() - post.diff)}
                      key={post.id}
                      image={post.image}
                      dp={post.dp}
                      handle={post.handle}
                      cover={post.cover}
                      name={post.name}
                      description={post.excerpt}
                    />
                  )
                )
              ) : (
                <div className="mt-24 flex w-full content-center items-center px-10 sm:px-24 md:px-16 lg:px-24">
                  <div className="mx-auto flex max-w-max flex-col gap-2">
                    <h1 className="mx-auto text-center text-lg font-semibold text-black">No Posts To View!</h1>
                    <h1 className="mx-auto text-center text-sm text-gray-400">
                      Your bookmarked posts appear in here. Seems like you have not bookmarked anything that matches
                      your search. Bookmark posts to view them here.
                    </h1>
                    <Link
                      href="/"
                      className={`mx-auto mt-3 w-max px-8 py-3 text-xs font-bold  ${
                        1 == 1 ? "bg-black text-white" : "border-2 bg-white"
                      }`}
                    >
                      Return To Home
                    </Link>
                  </div>
                </div>
              )
            ) : (
              <div className="flex h-screen w-full content-center items-center">
                <Oval
                  height={80}
                  width={80}
                  color="#000000"
                  wrapperStyle={{}}
                  wrapperClass="mx-auto mt-5"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#808080"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            )}
            <MoreBookMarks slug={search} />{" "}
          </div>{" "}
        </div>
      </div>
    );
  } else {
  }
}
