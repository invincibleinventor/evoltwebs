"use client";

import MoreSearchPosts from "@/components/MoreSearchPosts";
import PostComponent from "@/components/PostComponent";
import { createClient } from "@/utils/supabase/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export default function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  TimeAgo.locale(en);
  const date1 = new Date();
  const timeAgo = new TimeAgo("en-US");

  const [search, setSearch] = useState(params.slug);
  const [tempsearch, setTempSearch] = useState("");
  const [empty, setEmpty] = useState(true);
  const [posts, setPosts] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function get() {
      setLoading(true);

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: false })
        .textSearch("title_excerpt_content", `'${search}' | '${search.toLowerCase()}' | '${search.toUpperCase()}'`)
        .limit(5);
      if (error) {
        console.log(error);
      } else {
        console.log("SUPADATA: ", data);
        const ds = data;

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

        // console.log(ds);
        // console.log(posts);
      }
    }
    get();
  }, [search]);

  return (
    <div className="flex-1 h-screen p-0 py-2 overflow-hidden">
      <div className="p-4 py-2 mx-1 md:mx-1">
        <div className="relative items-center content-center">
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
            onChange={(e) => setTempSearch(e.target.value.trim())}
            minLength={4}
            maxLength={50}
            type="search"
            className="font-poppins peer h-12 w-full border border-gray-200 bg-white pl-14 pr-8 text-[14px] placeholder:text-gray-600 focus:bg-white focus:outline-black"
            placeholder={"Search Posts"}
          ></input>
        </div>
      </div>
      <div className="h-full overflow-y-scroll hiddenscroll">
        <div className="flex flex-col gap-2 mb-20 animate-in hiddenscroll">
          {!loading ? (
            !empty ? (
              posts.map((post:any) => (
                <PostComponent
                  cover={post.cover}
                  id={post.id}
                  title={post.title}
                  time={timeAgo.format(Date.now() - post.diff)}
                  key={post.id}
                  image={post.image}
                  dp={post.dp}
                  handle={post.handle}
                  name={post.name}
                  description={post.excerpt}
                />
              ))
            ) : (
              <div className="flex items-center content-center w-full px-10 mt-24 sm:px-24 md:px-16 lg:px-24">
                <div className="flex flex-col gap-2 mx-auto max-w-max">
                  <h1 className="mx-auto text-lg font-semibold text-center text-black">No Posts To View!</h1>
                  <h1 className="mx-auto text-sm text-center text-gray-800">
                    The text you searched for does not match any post. Please use a different search term.
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
            <div className="flex items-center content-center w-full h-screen">
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
          <MoreSearchPosts slug={search} />{" "}
        </div>{" "}
      </div>
    </div>
  );
}
