import BookMarksComponent from "@/components/QuickieBookMarksComponent";
import CommentsComponent from "@/components/QuickieComments";
import LikeComponent from "@/components/QuickieLikeComponent";
import { createClient } from "@/utils/supabase/server";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Iof from "@/components/Iof";
export default async function App({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let author = "";
  let content = "";
  let image:[]=[];
  let profile = "";
  let error = false;
  let naam = "";
  let time = 0;
  let loading = false;
  let myname = "";
  let myphoto = "";
  let myhandle = "";
  let loggedin = false;
  let liked = false;
  let photocount = 0;
  let likedlist: string | [] = [];
  let bookmarked = false;
  let bookmarkedlist: never[] = [];
  let userliked: never[] = [];
  let userbookmarked: never[] = [];
  let comments: any[] = [];
  TimeAgo.locale(en);
  let user = "";
  const timeAgo = new TimeAgo("en-US");
  const date1 = new Date();

  async function set() {
    const { data: u } = await supabase.auth.getSession();
    if (u.session) {
      user = u.session.user.id;

      loggedin = true;
      const { data: users } = await supabase.from("user").select("*").eq("id", user);
      if (users) {
        myphoto = users[0]["image"];
        myname = users[0]["name"];
        myhandle = users[0]["handle"];
        userliked = users[0]["liked"];
        userbookmarked = users[0]["bookmarks"];
      }
    }
    const { data, error: e } = await supabase.from("quickies").select("*").eq("id", params.slug);
    if (data && data.length > 0) {
      error = false;
      const l = data[0]["liked"];
      if (l.includes(myhandle)) {
        liked = true;
      }
      likedlist = l;
      const x = data[0]["bookmarked"];
      if (x.includes(myhandle)) {
        bookmarked = true;
      }
      bookmarkedlist = x;
      const { data: u } = await supabase.from("user").select("*").eq("id", data[0]["poster"]);
      if (u) {
        author = u[0]["handle"];
        
        naam = u[0].name;
        profile = u[0].image;
        content = data[0]["content"];
        image=data[0]["image"];
        photocount=data[0]["image"].length;
        
      }
      const date2 = new Date(data[0].created_at);
      time = date1.getTime() - date2.getTime();
      loading = false;
    } else if (e || data.length == 0) {
      error = true;
      loading = false;
    }
  }

  await set();

  async function fetchcomments() {
    const { data, error } = await supabase
      .from("quickiecomments")
      .select("*")
      .eq("id", params.slug)
      .order("likes", { ascending: false });
    if (data && data.length != 0) {
      comments = data;
      for await (const [index, comment] of comments.entries()) {
        console.log(index, comment);
        const { data } = await supabase.from("user").select("*").eq("id", comment.poster);
        if (data) {
          comments[index].name = data[0]["name"];
          comments[index].profile = data[0]["image"];

          if (loggedin) {
            if (comments[index].liked.includes(myhandle)) {
              console.log(myhandle, index);
              comments[index].likedbyme = true;
            } else {
              comments[index].likedbyme = false;
            }
          } else {
            comments[index].likedbyme = false;
          }
          console.log(comments[index]);
        } else {
          comments.splice(index, 1);
        }
      }
    } else if (!data || data.length == 0) {
      comments = [];
    } else {
      console.log(error);
    }
  }
  await fetchcomments();

 
  console.log("here");
  console.log(comments);
  console.log("above");
  return !loading ? (
    <div className="relative flex flex-col flex-1 h-screen overflow-hidden bg-white">
      {error && (
        <div className="flex items-center content-center w-full h-screen px-10 sm:px-24 md:px-16 lg:px-24">
          <div className="flex flex-col gap-2 mx-auto max-w-max">
            <h1 className="mx-auto text-lg font-semibold text-center text-black">That Post Doesn&apos;t Exist</h1>
            <h1 className="mx-auto text-sm text-center text-gray-800">
              That post does not exist. It must have been removed or deleted by the author. Please refresh if you think
              that is not the case
            </h1>
            <Link
              href="/"
              className={`mx-auto mt-3 w-max px-8 py-3 text-xs font-bold ${
                1 == 1 ? "bg-black text-white" : "border-2  bg-white "
              }`}
            >
              Return Back
            </Link>
          </div>
        </div>
      )}
      {!error && (
        <div className="hiddenscroll h-full w-[calc(100vw-68px)] overflow-hidden pb-14 md:w-full md:max-w-full md:border-x md:border-x-gray-200">
          <div className="w-full px-0 py-[6px]">
        <div  className="flex flex-col rounded-none md:gap-0">
          <div  className="flex items-center content-center bg-black rounded-md ">
            
          </div>
          <div className="flex h-max flex-col gap-[8px] md:p-6 p-4 ">
            <div className="flex flex-row items-center content-center gap-2 h-max shrink-0">
             <Link className="w-10 h-10" href={`/profile/`+author}>
              <Image width={30} height={30} className="w-10 h-10 rounded-md shrink-0" src={profile} alt="dp" />
             </Link>
              <Link href={`/profile/`+author} className="flex flex-row gap-[2px]">
                <div className="flex flex-col content-center flex-1 gap-[2px] py-0 pl-2 rounded-lg">
                  <div className="flex flex-row items-center content-center">
                  <h1 className="text-sm font-medium text-black "><span className="inline-block md:hidden">{naam}</span><span className="hidden md:inline-block">{naam}</span></h1>
                  <h1 className="ml-2 text-xs font-normal text-gray-600 ">@{author}</h1>

                  </div>
                  <h1 className="text-xs font-medium text-gray-600">{timeAgo.format(Date.now() - time)}</h1>

                </div>

              </Link>
              
              <div className="pl-3 ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 16.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"/></g></svg>
              </div>
            </div>

            <div>
             

              <h1
                style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                className="my-4 text-sm font-normal text-gray-900 four-line-ellipsis md:text-base"
              >
                {content}
              </h1>
              {photocount>0  &&
              <div className={photocount==1?"w-full border rounded-md mt-4 aspect-video h-full":"mt-4 md:gap-2 gap-1 grid-cols-2 grid"}>
                {image.map((image:string) => 
                <Iof key={image} src={image}/>
                )}
              </div>
}


              <div className="flex flex-row items-center content-center mt-6">
      
         


              </div>
            </div>
          </div>
        </div>
      </div>
          <section className="px-8 pt-0 pb-8" id="comments">
            <h1 className="mb-2 text-lg font-bold">Comments</h1>

            <CommentsComponent
              myname={myname}
              myphoto={myphoto}
              handle={myhandle}
              id={user}
              myhandle={myhandle}
              slug={params.slug}
              loggedin={loggedin}
            />
          </section>
        </div>
      )}
      <div className="absolute bottom-0 flex flex-row w-full bg-white border-t h-14 border-t-gray-200 ">
      

<LikeComponent
          userliked={userliked}
          postid={params.slug}
          handle={myhandle}
          likedlist={likedlist}
          liked={liked}
          likes={likedlist.length}
        />
          <BookMarksComponent
          userliked={userbookmarked}
          postid={params.slug}
          handle={myhandle}
          likedlist={bookmarkedlist}
          liked={bookmarked}
          likes={bookmarkedlist.length}
        />
        <Link href="#comments" className="flex flex-row items-center content-center px-6 space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="m4 11.29l1-1v1.42l-1.15 1.14L3 12.5V10H1.5L1 9.5v-8l.5-.5h12l.5.5V6h-1V2H2v7h1.5l.5.5zM10.29 13l1.86 1.85l.85-.35V13h1.5l.5-.5v-5l-.5-.5h-8l-.5.5v5l.5.5zm.21-1H7V8h7v4h-1.5l-.5.5v.79l-1.15-1.14z"
              clipRule="evenodd"
            />
          </svg>{" "}
          <h1 className="text-xs md:text-sm">Comments</h1>
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex items-center content-center w-full h-screen"></div>
  );
}
