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
import UserComponent from "@/components/UserComponent";
import MoreUsers from "@/components/MoreUsers";
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
  let empty = false;
  let users: any[] = [];
  let loading = true;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let userid = user?.id;
  let myhandle = "";
  let followinglist: never[] = [];
  async function get() {
    const { data, error } = await supabase.from("user").select("*").not("id", "in", `(${userid})`).limit(4);
    if (error) {
      console.log(error);
    } else {
      let ds = data;
      const { data: u, error: e } = await supabase.from("user").select("*").eq("id", userid);
      let ifollow;
      if(u){
      ifollow = u[0]["following"];
      followinglist = ifollow;
      myhandle = u[0]["handle"]; 
    }
      
      for await (const [index, user] of ds.entries()) {
        if (ifollow.includes(user.handle)) {
          ds[index]["isfollowing"] = true;
        } else {
          ds[index]["isfollowing"] = false;
        }
      }
      users = ds;
      console.log(users);
      loading = false;
    }
  }
  await get();

  if (isSupabaseConnected) {
    return (
      <>
        <div className="flex-1 h-screen p-0 py-2 pb-20 overflow-x-hidden overflow-y-hidden">
          <div className="p-4 py-2 pb-4 mx-1 md:mx-1">
            <Search page="induvidual" text="Users" />
          </div>
          <div className="h-full overflow-y-scroll hiddenscroll">
            <div className="grid items-center content-center grid-cols-1 gap-2 px-3 xl:grid-cols-2 animate-in hiddenscroll">
              {!loading ? (
                !empty ? (
                  users.map((user) => (
                    <UserComponent
                      myID={myhandle}
                      key={user.id}
                      followerlist={user.followers}
                      followinglist={followinglist}
                      id={user.id}
                      name={user.name}
                      following={user.following.length}
                      isfollowing={user.isfollowing}
                      handle={user.handle}
                      about={user.about}
                      followers={user.followers.length}
                      image={user.image}
                    />
                  ))
                ) : (
                  <div className="flex items-center content-center w-full px-10 mt-24 lg:px-24 sm:px-24 md:px-16">
                    <div className="flex flex-col gap-2 mx-auto max-w-max">
                      <h1 className="mx-auto text-lg font-semibold text-center text-black">No Posts To View!</h1>
                      <h1 className="mx-auto text-sm text-center text-neutral-400">
                        Follow people to view their posts on your home feed. The more people you follow, the more posts
                        on your feed
                      </h1>
                      <Link
                        href="/explore"
                        className={`w-max mx-auto text-xs font-bold mt-3 px-8 py-3  ${
                          1 == 1 ? "bg-black text-white" : "bg-white border-2"
                        }`}
                      >
                        Explore People
                      </Link>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-center content-center w-full h-screen"></div>
              )}
            </div>
            <MoreUsers></MoreUsers>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
