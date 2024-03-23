"use client";

import { createClient } from "@/utils/supabase/client";
import "@mdxeditor/editor/style.css";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import rehypeSanitize from "rehype-sanitize";

export default function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  async function coverChange(id: string) {
    console.log("here here");
    const bucket = "posts";

    // Call Storage API to upload file
    const { error } = await supabase.storage.from(bucket).upload("/covers/" + id + ".jpg", file, { upsert: true });

    // Handle error if upload failed
    if (error) {
      alert("Error uploading file.");
    } else {
      console.log(id);

      console.log("updazted");
      return "https://xiexuntwvmedvyxokvvf.supabase.co/storage/v1/object/public/posts/covers/" + id + ".jpg";
    }
  }

  const handleClick = (event:any) => {
    event.preventDefault();
    hiddenFileInput!.current!.click();
  };

  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [deleteDialog,toggledeleteDialog] = useState("hidden")
  const [cover, setCover] = useState("/bgcover.jpg");
  const [file, setFile] = useState<any>();
  const [changed, setChanged] = useState(false);
  const [title, setTitle] = useState("");
  const [, setNotFound] = useState(false);
  const [author, setAuthor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      const { data, error } = await supabase.from("posts").select("*").eq("id", params.slug);
      if (error) {
        setNotFound(true);
        setLoading(false);
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (data[0]["poster"] == user?.id) {
          setAuthor(true);
          setContent(data[0]["content"]);
          setExcerpt(data[0]["excerpt"]);
          setTitle(data[0]["title"]);
          setCover(data[0]["cover"] + "?" + new Date().getTime());
        }
        setLoading(false);
      }
    }

    check();
  }, []);
  async function del(){
    toggledeleteDialog('hidden')
    setLoading(true)
    const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', params.slug)
  if(error){
    alert(error)

  }
  else{
    window.location.replace("/");
  }
  }
  async function create() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("posts")
      .upsert({ id: params.slug, excerpt: excerpt, content: content, title: title });
    if (error) {
      alert(error.message);
      console.log(error);
    } else {
      if (changed) {
        const { data } = await supabase
          .from("posts")
          .select("*")
          .eq("poster", user?.id)
          .order("id", { ascending: false })
          .limit(1);
        if (data) {
          const newCover = await coverChange(data[0]["id"]);
          const { error: es } = await supabase.from("posts").update({ cover: newCover }).eq("id", data[0]["id"]);
          if (es) {
            alert(es.message);
          } else {
            window.location.replace("/");
          }
        } else {
          window.location.replace("/");
        }
      }
    }
  }
  return !loading ? (
    author ? (
      <div className={`h-screen flex-1 gap-2 overflow-hidden px-8`}>
                <div style={{zIndex:1000}} className={"absolute py-4 flex flex-col content-center  top-0 bottom-0 left-0 right-0 w-64 h-48 mx-auto my-auto bg-white border border-black shadow-md md:w-84 lg:w-96 "+deleteDialog}>
               
                  <h1 className="mx-4 text-lg font-medium">Delete this post?</h1>
                  <h1 className="mx-4 mt-2 text-sm">Are you sure you want to delete this post?</h1>
                  <div className="flex flex-row items-center content-center w-full pt-4 mt-auto ml-auto border-t"><button onClick={()=>toggledeleteDialog("hidden")} className="px-6 py-3 mt-auto text-sm font-medium text-black">Cancel</button><button onClick={()=>del()} className="px-6 py-3 mt-auto ml-auto mr-4 text-xs font-medium text-white bg-black">Delete It</button></div>
                </div>

        <div className="h-full overflow-y-scroll hiddenscroll">
          <form
            className="flex flex-col justify-center w-full gap-2 py-10 pr-5 my-auto overflow-x-hidden animate-in text-foreground"
            action={create}
          >
          <div className="flex flex-row content-center justify-between">
            <h1 className="mb-6 text-2xl font-bold text-black md:text-3xl">Edit The Post</h1>
      <div className="flex flex-row items-center content-center ">
        <button  onClick={()=>toggledeleteDialog("")} disabled={deleteDialog!="hidden"?true:false} className="flex flex-row items-center content-center px-6 py-3 space-x-3 text-sm border border-black ">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0"/></svg>        <h1>Delete <span className="md:inline-block hidden">Post</span></h1>
      </button>
      </div>
</div>
            <label className="mb-1 text-base" htmlFor="content">
              Title
            </label>
            <input
            disabled={deleteDialog!="hidden"?true:false}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mb-6 mr-4 text-sm bg-white border "
              name="content"
              placeholder="Please Type Out Your Title"
              required
              defaultValue={title}
              maxLength={60}
              minLength={15}
            />
            <label className="mb-1 text-base" htmlFor="content">
              Excerpt
            </label>
            <textarea
            disabled={deleteDialog!="hidden"?true:false}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 mb-6 mr-4 text-sm bg-white border "
              name="content"
              placeholder="Please Type Out Your Excerpt"
              required
              defaultValue={excerpt}
              maxLength={150}
              minLength={90}
            />
            <input
              onChange={(e:any) => {
                setCover(URL.createObjectURL(e.target.files[0]));
                setFile(e.target.files[0]);
              }}
              className="inset-x-0 bottom-0 hidden mx-auto"
              type="file"
              ref={hiddenFileInput}
            />
            <label className="mb-1 text-base" htmlFor="content">
              Cover Image
            </label>
            <div className="relative px-4 py-2 mb-6 border aspect-video shrink-0">
            <img
              src={cover}
              
              className="absolute inset-0 object-cover aspect-video shrink-0"
              alt="cover"
            />
              <button
              disabled={deleteDialog!="hidden"?true:false}
                onClick={(e) => {
                  setChanged(true);
                  handleClick(e);
                }}
                className="absolute inset-0 px-6 py-3 m-auto text-xs text-white h-max w-max bg-black/60 backdrop-blur-sm"
              >
                Change Cover
              </button>
            </div>
            <label className="mb-1 text-base" htmlFor="content">
              Content
            </label>
            <div data-color-mode="light">
              <MDEditor
                className="mx-[2px] mb-6 shrink rounded-none"
                style={{ borderRadius: "0px", height: "100px !important" }}
                value={content}
                onChange={(e) => setContent(e!)}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </div>

            <button disabled={deleteDialog!="hidden"?true:false} className="px-8 py-4 mb-2 text-xs font-medium text-white bg-black w-max">Publish This Post</button>
          </form>
        </div>
      </div>
    ) : (
      <div className="flex items-center content-center w-full px-10 mt-24 sm:px-24 md:px-16 lg:px-24">
        <div className="flex flex-col gap-2 mx-auto max-w-max">
          <h1 className="mx-auto text-lg font-semibold text-center text-black">
            You are not allowed to edit this post.
          </h1>
          <h1 className="mx-auto text-sm text-center text-gray-800">
            Only the Author of the post is allowed to edit a post. Try from a different account or leave this page.
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
    <div className="flex items-center content-center w-full h-screen">
      <Oval
        height={80}
        width={80}
        color="#000"
        wrapperStyle={{}}
        wrapperClass="mx-auto"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#808080"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
