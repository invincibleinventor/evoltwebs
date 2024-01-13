import BookMarksComponent from "@/components/BookMarksComponent";
import CommentsComponent from "@/components/CommentsComponent";
import LikeComponent from "@/components/LikeComponent";
import { createClient } from "@/utils/supabase/server";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ClassAttributes, ImgHTMLAttributes, JSX } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default async function App({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let author = "";
  let content = "";
  let title = "";
  let name = "";
  let cover = "";
  let profile = "";
  let error = false;
  let time = 0;
  let loading = false;
  let imauthor = false;
  let myname = "";
  let myphoto = "";
  let myhandle = "";
  let loggedin = false;
  let liked = false;
  let likedlist = [];
  let bookmarked = false;
  let bookmarkedlist: never[] = [];
  let userliked: never[] = [];
  let userbookmarked: never[] = [];
  let comments = [];
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
    const { data, error: e } = await supabase.from("posts").select("*").eq("id", params.slug);
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
        if (author == myhandle) {
          imauthor = true;
        }
        name = u[0].name;
        profile = u[0].image;
        content = data[0]["content"];
        title = data[0]["title"];
        cover = data[0]["cover"];
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
      .from("comments")
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
  function ClickableImage(
    props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>
  ) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} className="w-full max-w-full" />;
  }
  const components = {
    img: ClickableImage,
  };
  console.log("here");
  console.log(comments);
  console.log("above");
  return !loading ? (
    <div className="relative flex h-screen flex-1 flex-col overflow-hidden">
      {error && (
        <div className="flex h-screen w-full content-center items-center px-10 sm:px-24 md:px-16 lg:px-24">
          <div className="mx-auto flex max-w-max flex-col gap-2">
            <h1 className="mx-auto text-center text-lg font-semibold text-black">That Post Doesn&apos;t Exist</h1>
            <h1 className="mx-auto text-center text-sm text-gray-800">
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
          <div className="relative h-64 w-full">
            <Image
              width={250}
              height={250}
              alt="coveri"
              src={cover ? cover : "https://picsum.photos/2000/3000"}
              className="absolute inset-0 h-64 w-full object-cover"
            />
          </div>
          <div className="flex w-full max-w-full flex-1 flex-col p-8">
            <h1 className="fix-overflow text-3xl font-extrabold md:text-4xl md:leading-[calc(13*4px)]">{title}</h1>
            {imauthor && (
              <Link
                href={"/edit/" + params.slug}
                className="my-4 mt-6 flex cursor-pointer flex-row  content-center items-center space-x-[16px] px-1  pr-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
                  />
                </svg>

                <h1 className="inline-block text-sm">Edit Post</h1>
              </Link>
            )}
            <div className="mt-6 flex flex-row content-center items-center justify-between text-lg">
              <Link href={"/profile/" + author} className="flex flex-row content-center items-center">
                <Image width={24} height={24} alt="profile" className="mr-3 h-6 w-6" src={profile} />
                <h1 className="font-medium">{name}</h1>
              </Link>

              <h1 className="text-sm font-normal">Posted {timeAgo.format(Date.now() - time)}</h1>
            </div>
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={components}
              className="font-inter fix-overflow prose mt-12"
            >
              {content}
            </Markdown>
          </div>
          <section className="px-8 pb-8 pt-0" id="comments">
            <h1 className="mb-2 text-xl font-bold">Comments</h1>

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
      <div className="absolute bottom-0 flex h-14 w-full flex-row border-t border-t-gray-200 bg-white ">
        <BookMarksComponent
          userliked={userbookmarked}
          postid={params.slug}
          handle={myhandle}
          likedlist={bookmarkedlist}
          liked={bookmarked}
        />

        <LikeComponent
          userliked={userliked}
          postid={params.slug}
          handle={myhandle}
          likedlist={likedlist}
          liked={liked}
          likes={likedlist.length}
        />

        <Link href="#comments" className="ml-auto flex flex-row content-center items-center space-x-2 px-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="m4 11.29l1-1v1.42l-1.15 1.14L3 12.5V10H1.5L1 9.5v-8l.5-.5h12l.5.5V6h-1V2H2v7h1.5l.5.5zM10.29 13l1.86 1.85l.85-.35V13h1.5l.5-.5v-5l-.5-.5h-8l-.5.5v5l.5.5zm.21-1H7V8h7v4h-1.5l-.5.5v.79l-1.15-1.14z"
              clipRule="evenodd"
            />
          </svg>{" "}
          <h1 className="text-sm">Comments</h1>
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex h-screen w-full content-center items-center"></div>
  );
}
