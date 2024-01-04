"use client";

import { useEffect, useState } from "react";
import UserComponent from "./UserComponent";
import { createClient } from "@/utils/supabase/client";
import { useInView } from "react-intersection-observer";
import { Oval } from "react-loader-spinner";

export default function MoreUsers(props:any) {
  const [users, setUsers] = useState<any>([]);
  const [myhandle, setMyHandle] = useState("");
  const [userid, setUserId] = useState("");
  const supabase = createClient();
  const [followinglist, setFollowingList] = useState([]);
  const PAGE_COUNT = 4;
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [offset, setOffset] = useState(1);
  const { ref, inView } = useInView();
  const [halt, setHalt] = useState(false);
  useEffect(() => {
    async function set() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if(user){
      setUserId(user.id);
      }
      const { data, error } = await supabase.from("user").select("*").eq("id", user?.id);
      if(data){
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
    const { data, error } = await supabase.from("user").select("*").range(from, to).not("id", "in", `(${user?.id})`);
    if (error) {
      console.log(error);
    } else {
      if (data && data.length > 0) {
        console.log(data);
        let ds = data;
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data: x, error: xe } = await supabase.from("user").select("*").eq("id", user?.id);

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
      <div className="grid items-center content-center grid-cols-1 gap-2 px-3 xl:grid-cols-2 animate-in hiddenscroll">
        {users.map((user:any) => (
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
      <div className="flex flex-col items-center content-center w-full">
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
