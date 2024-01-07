"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Oval } from "react-loader-spinner";
import UserComponent from "./UserComponent";

export default function MoreUsers() {
  const [users, setUsers] = useState<any>([]);
  const [myhandle, setMyHandle] = useState("");
  const [, setUserId] = useState("");
  const supabase = createClient();
  const [followinglist, setFollowingList] = useState([]);
  const PAGE_COUNT = 4;
  const [offset, setOffset] = useState(1);
  const { ref, inView } = useInView();
  const [halt, setHalt] = useState(false);
  useEffect(() => {
    async function set() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("id", user?.id);
      if (data) {
        setMyHandle(data[0]["handle"]);
        setFollowingList(data[0]["following"]);
      }
    }
    set();
  }, []);

  async function get(from: number, to: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .range(from, to)
      .not("id", "in", `(${user?.id})`);
    if (error) {
      console.log(error);
    } else {
      if (data && data.length > 0) {
        console.log(data);
        const ds = data;
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data: x } = await supabase
          .from("user")
          .select("*")
          .eq("id", user?.id);

        for await (const [index, post] of ds.entries()) {
          if (x && x[0]["following"].includes(post.handle)) {
            ds[index]["isfollowing"] = true;
          } else {
            ds[index]["isfollowing"] = false;
          }
        }
        setUsers([...users, ...ds]);
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
    <div className="w-full">
      <div className="animate-in hiddenscroll grid grid-cols-1 content-center items-center gap-2 px-3 xl:grid-cols-2">
        {users.map((user: any) => (
          <UserComponent
            myID={myhandle}
            key={user["id"]}
            followerlist={user["followers"]}
            followinglist={followinglist}
            id={user["id"]}
            name={user["name"]}
            following={user.following?.length}
            isfollowing={user.isfollowing}
            handle={user.handle}
            about={user.about}
            followers={user.followers.length}
            image={user.image}
          />
        ))}
      </div>
      <div className="flex w-full flex-col content-center items-center">
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
      </div>
      <div className={!halt ? "" : "hidden"} ref={ref}></div>
    </div>
  );
}
