"use client";
import "@mdxeditor/editor/style.css";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  MDXEditor,
  linkPlugin,
  MDXEditorMethods,
  headingsPlugin,
  UndoRedo,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
} from "@mdxeditor/editor";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { Oval } from "react-loader-spinner";

export default function Page({ params }: { params: { slug: string } }) {
  async function coverChange(id: string) {
    console.log("here here");
    const bucket = "posts";

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload("/covers/" + id + ".jpg", file, { upsert: true });

    // Handle error if upload failed
    if (error) {
      alert("Error uploading file.");
    } else {
      console.log(id);

      console.log("updazted");
      return "https://xiexuntwvmedvyxokvvf.supabase.co/storage/v1/object/public/posts/covers/" + id + ".jpg";
    }
  }
  const hiddenFileInput = useRef<HTMLInputElement | any>(null);
  const handleClick = (event: any) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };
  const supabase = createClient();
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [cover, setCover] = useState("/bg.jpg");
  const [file, setFile] = useState<any>();
  const [changed, setChanged] = useState(false);
  const [title, setTitle] = useState("");
  const [notfound, setNotFound] = useState(false);
  const [author, setAuthor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [defaulttitle, setdefaulttitle] = useState("");
  const [defaultcover, setdefaultcover] = useState("");
  const [defaultcontent, setdefaultcontent] = useState("");
  const [defaultexcerpt, setdefaultexcerpt] = useState("");
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
  async function create() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("posts")
      .upsert({ id: params.slug, excerpt: excerpt, content: content, title: title });
    if (error) {
      alert(error.message);
      console.log(error);
    } else {
      
      if (changed) {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("poster", user?.id)
          .order("id", { ascending: false })
          .limit(1);
          if(data){
        let newCover = await coverChange(data[0]["id"]);
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
      <div className={`flex-1 h-screen overflow-y-hidden px-8 gap-2 overflow-x-hidden`}>
        <div className="h-full overflow-y-scroll hiddenscroll">
          <form
            className="flex flex-col justify-center w-full gap-2 pt-10 pb-10 pr-5 my-auto overflow-x-hidden animate-in text-foreground"
            action={create}
          >
            <h1 className="mb-6 text-2xl font-bold text-black md:text-3xl">Edit The Post</h1>

            <label className="mb-1 text-md" htmlFor="content">
              Title
            </label>
            <input
              onChange={(e: any) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mb-6 mr-4 text-sm bg-white border "
              name="content"
              placeholder="Please Type Out Your Title"
              required
              defaultValue={title}
              maxLength={60}
              minLength={15}
            />
            <label className="mb-1 text-md" htmlFor="content">
              Excerpt
            </label>
            <textarea
              onChange={(e: any) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 mb-6 mr-4 text-sm bg-white border "
              name="content"
              placeholder="Please Type Out Your Excerpt"
              required
              defaultValue={excerpt}
              maxLength={150}
              minLength={90}
            />
            <input
              onChange={(e:any) => (setCover(URL.createObjectURL(e.target.files[0])), setFile(e.target.files[0]))}
              className="bottom-0 left-0 right-0 hidden mx-auto"
              type="file"
              ref={hiddenFileInput}
            />
            <label className="mb-1 text-md" htmlFor="content">
              Cover Image
            </label>
            <div className="relative w-full h-40 px-4 py-2 mb-6 mr-4 border shrink-0">
              <img
                src={cover}
                className="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-40 shrink-0"
              ></img>
              <button
                onClick={(e: any) => (setChanged(true), handleClick(e))}
                className="absolute top-0 bottom-0 left-0 right-0 px-6 py-3 mx-auto my-auto text-xs text-white bg-black bg-opacity-60 backdrop-blur-sm w-max h-max"
              >
                Change Cover
              </button>
            </div>
            <label className="mb-1 text-md" htmlFor="content">
              Content
            </label>
            <div data-color-mode="light">
              <div className="wmde-markdown-var"> </div>

              <MDEditor
                className="mx-[2px] mb-6 shrink-1 rounded-none"
                style={{ borderRadius: "0px", height: "100px !important" }}
                value={content}
                onChange={()=>(setContent)}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </div>

            <button className="px-8 py-4 mb-2 text-sm text-white bg-black w-max text-foreground">
              Publish This Post
            </button>
          </form>
        </div>
      </div>
    ) : (
      <div className="flex items-center content-center w-full px-10 mt-24 lg:px-24 sm:px-24 md:px-16">
        <div className="flex flex-col gap-2 mx-auto max-w-max">
          <h1 className="mx-auto text-lg font-semibold text-center text-black">
            You are not allowed to edit this post.
          </h1>
          <h1 className="mx-auto text-sm text-center text-neutral-400">
            Only the Author of the post is allowed to edit a post. Try from a different account or leave this page.
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
