"use client";
import { createClient } from "@/utils/supabase/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Oval } from "react-loader-spinner";
import PostComponent from "./PostComponent";
export default function MoreBookMarks(props: { slug: string }) {
  const supabase = createClient();
  const [offset, setOffset] = useState(1);
  const { ref, inView } = useInView();
  const [halt, setHalt] = useState(false);
  const [posts, setPosts] = useState([]);
  TimeAgo.locale(en);
  const PAGE_COUNT = 5;
  const timeAgo = new TimeAgo("en-US");
  const date1 = new Date();

  async function get(from: number, to: number) {
    const { data: user } = await supabase.auth.getUser();
    const s = user?.user?.id;
    const { data: u } = await supabase.from("user").select("*").eq("id", s);
    let l = [];
    if (u) {
      l = u[0]["bookmarks"];
    }
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false })
      .in("id", l)
      .textSearch(
        "title_excerpt_content",
        `'${props.slug}' | '${props.slug.toLowerCase()}' | '${props.slug.toUpperCase()}'`
      )
      .range(from, to);
    if (error) {
      console.log(error);
    } else {
      if (data && data.length > 0) {
        console.log(data);
        const ds = data;
        for await (const [index, post] of ds.entries()) {
          const { data } = await supabase.from("user").select("*").eq("id", post.poster);
          if (data) {
            ds[index].name = data[0].name;

            ds[index].dp = data[0].image;

            const date2 = new Date(ds[index].created_at);
            ds[index].diff = date1.getTime() - date2.getTime();
          }
        }
        setPosts([...posts, ...ds]);
        if (ds.length < PAGE_COUNT) {
          setHalt(true);
        }
      } else {
        setHalt(true);
      }
    }
  }
  useEffect(() => {
    if (!halt && inView) {
      setOffset((prev) => prev + 1);

      const from = offset * PAGE_COUNT;
      const to = from + PAGE_COUNT - 1;

      get(from, to);
    }
  }, [inView]);
  return (
    <>
      <div className="flex flex-col content-center items-center gap-2">
        {posts.map((post) => (
          <PostComponent
            id={post.id}
            type="profile"
            title={post.title}
            cover={post.cover}
            time={timeAgo.format(Date.now() - post.diff)}
            key={post.id}
            image={post.image}
            dp={post.dp}
            handle={post.handle}
            name={post.name}
            description={post.excerpt}
          />
        ))}
        <Oval
          height={80}
          width={80}
          color="#000000"
          wrapperStyle={{}}
          wrapperClass="mx-auto mt-5"
          visible={!halt ? true : false}
          ariaLabel="oval-loading"
          secondaryColor="#808080"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        <div className={!halt ? "" : "hidden"} ref={ref}></div>
      </div>
    </>
  );
}
