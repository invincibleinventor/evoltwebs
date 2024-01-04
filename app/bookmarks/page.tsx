import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import StoriesView from "@/components/StoriesView";
import PostComponent from "@/components/PostComponent";
import { redirect } from "next/navigation";
import More from "@/components/More";
import Search from "@/components/SearchComponent";
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
    let s = user?.user?.id;
    const { data: u } = await supabase.from("user").select("*").eq("id", s);
    if(u){
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
        const { data, error } = await supabase.from("user").select("*").eq("id", post.poster);
        if(data){
        ds[index].name = data[0].name;
        let date2 = new Date(ds[index].created_at);
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
        <div className="flex-1 h-screen p-0 py-2 overflow-x-hidden overflow-y-hidden">
          <div className="p-4 py-2 pb-4 mx-1 md:mx-1">
            <Search page="bookmarks" text="Bookmarks" />
          </div>
          <h1 className="px-5 my-4 mt-2 text-xl font-bold">My Bookmarks</h1>
          <div className="h-full overflow-y-scroll hiddenscroll">
            <div className="flex flex-col gap-2 mb-20 animate-in hiddenscroll">
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
                  <div className="flex items-center content-center w-full px-10 mt-24 lg:px-24 sm:px-24 md:px-16">
                    <div className="flex flex-col gap-2 mx-auto max-w-max">
                      <h1 className="mx-auto text-lg font-semibold text-center text-black">No Posts To View!</h1>
                      <h1 className="mx-auto text-sm text-center text-neutral-400">
                        Your bookmarked posts appear in here. Seems like you have not bookmarked anything yet. Bookmark
                        posts to view them here.
                      </h1>
                      <Link
                        href="/"
                        className={`w-max mx-auto text-xs font-bold mt-3 px-8 py-3  ${
                          1 == 1 ? "bg-black text-white" : "bg-white border-2"
                        }`}
                      >
                        Return To Home
                      </Link>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-center content-center w-full h-screen"></div>
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
