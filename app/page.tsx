import More from "@/components/More";
import PostComponent from "@/components/PostComponent";
import Search from "@/components/SearchComponent";
import { createClient } from "@/utils/supabase/server";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };
  TimeAgo.locale(en);

  const timeAgo = new TimeAgo("en-US");
  const date1 = new Date();
  const isSupabaseConnected = canInitSupabaseClient();
  let empty = true;
  let posts: any[] = [];
  let loading = true;
  let l: any[] = [];
  async function get() {
    const { data: user } = await supabase.auth.getUser();
    const s = user.user!.id;
    const { data: u } = await supabase.from("user").select("*").eq("id", s);
    l = u![0]["following"];
    const h = u![0]["handle"];
    let ds = [];

    l.push(h);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false })
      .in("handle", l)
      .limit(5);
    if (error) {
    } else {
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
        empty = false;
      } else {
        empty = true;
      }
      posts = ds;
      loading = false;
    }
  }
  await get();

  if (isSupabaseConnected) {
    return (
      <>
        <div className="h-screen flex-1 overflow-hidden p-0 py-2">
          <div className="mx-1 p-4 py-2 md:mx-1">
            <Search page="posts" text="Evolt" />
          </div>
          <div className="hiddenscroll h-full overflow-y-scroll">
            <div className="animate-in hiddenscroll mb-20 flex flex-col gap-2">
              {!loading ? (
                !empty ? (
                  posts.map((post) => (
                    <PostComponent
                      id={post.id}
                      cover={post.cover}
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
                  <div className="mt-24 flex w-full content-center items-center px-10 sm:px-24 md:px-16 lg:px-24">
                    <div className="mx-auto flex max-w-max flex-col gap-2">
                      <h1 className="mx-auto text-center text-lg font-semibold text-black">No Posts To View!</h1>
                      <h1 className="mx-auto text-center text-sm text-gray-800">
                        Follow people to view their posts on your home feed. The more people you follow, the more posts
                        on your feed
                      </h1>
                      <Link
                        href="/explore"
                        className={`mx-auto mt-3 w-max px-8 py-3 text-xs font-bold  ${
                          1 == 1 ? "bg-black text-white" : "border-2 bg-white"
                        }`}
                      >
                        Explore People
                      </Link>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex h-screen w-full content-center items-center"></div>
              )}
              <More in={l}></More>{" "}
            </div>{" "}
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
