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
  let l: readonly any[] = [];
  async function get() {
    const { data: user } = await supabase.auth.getUser();
    const s = user?.user?.id;
    const { data: u } = await supabase.from("user").select("*").eq("id", s);
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
      .in("id", l)
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
            <Search page="bookmarks" text="Bookmarks" />
          </div>
          <h1 className="my-4 mt-2 px-5 text-xl font-bold">My Bookmarks</h1>
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
                        Your bookmarked posts appear in here. Seems like you have not bookmarked anything yet. Bookmark
                        posts to view them here.
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
