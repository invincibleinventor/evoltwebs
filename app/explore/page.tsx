import MoreUsers from "@/components/MoreUsers";
import Search from "@/components/SearchComponent";
import UserComponent from "@/components/UserComponent";
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

  const isSupabaseConnected = canInitSupabaseClient();
  const empty = false;
  let users = [];
  let loading = true;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userid = user?.id;
  let myhandle = "";
  let followinglist: never[] = [];
  async function get() {
    const { data, error } = await supabase.from("user").select("*").not("id", "in", `(${userid})`).limit(4);
    if (error) {
      console.log(error);
    } else {
      const ds = data;
      const { data: u } = await supabase.from("user").select("*").eq("id", userid);
      let ifollow;
      if (u) {
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
        <div className="h-screen flex-1 overflow-hidden p-0 py-2 pb-20">
          <div className="mx-1 p-4 py-2 md:mx-1">
            <Search page="induvidual" text="Users" />
          </div>
          <div className="hiddenscroll h-full overflow-y-scroll">
            <div className="animate-in hiddenscroll grid grid-cols-1 content-center items-center gap-2 px-3 xl:grid-cols-2">
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
