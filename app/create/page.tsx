"use client";
import { createClient } from "@/utils/supabase/client";
import "@mdxeditor/editor/style.css";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import rehypeSanitize from "rehype-sanitize";

export default function Create() {
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
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput!.current!.click();
  };
  const supabase = createClient();
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [cover, setCover] = useState("/bg.jpg");
  const [file, setFile] = useState();
  const [changed, setChanged] = useState(false);
  const [title, setTitle] = useState("");
  async function create() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: u } = await supabase
      .from("user")
      .select("handle")
      .eq("id", user?.id);
    const { data: check } = await supabase
      .from("posts")
      .select("*")
      .eq("poster", user?.id)
      .order("id", { ascending: false })
      .limit(1);
    let s;
    if (check && check.length > 0) {
      s = check[0];
    } else {
      s = [];
    }
    if (u) {
      if (s && s.excerpt == excerpt && s.title == title && s.handle == u[0]["handle"] && s.content == content) {
        return redirect("/");
      } else {
        const { error } = await supabase
          .from("posts")
          .insert({ handle: u[0]["handle"], excerpt: excerpt, content: content, title: title });
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
    }
  }
  return (
    <div className={`h-screen flex-1 gap-2 overflow-hidden px-8`}>
      <div className="hiddenscroll h-full overflow-y-scroll">
        <form
          className="animate-in my-auto flex w-full flex-col justify-center gap-2 overflow-x-hidden py-10 pr-5 text-foreground"
          action={create}
        >
          <h1 className="mb-6 text-2xl font-bold text-black md:text-3xl">Publish New Post</h1>

          <label className="mb-1 text-lg" htmlFor="content">
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="mb-6 mr-4 w-full border bg-white px-4 py-2 text-sm "
            name="content"
            placeholder="Please Type Out Your Title"
            required
            maxLength={60}
            minLength={15}
          />
          <label className="mb-1 text-lg" htmlFor="content">
            Excerpt
          </label>
          <textarea
            onChange={(e) => setExcerpt(e.target.value)}
            className="mb-6 mr-4 w-full border bg-white px-4 py-2 text-sm "
            name="content"
            placeholder="Please Type Out Your Excerpt"
            required
            maxLength={150}
            minLength={90}
          />
          <input
            onChange={(e) => (setCover(URL.createObjectURL(e.target.files[0])), setFile(e.target.files[0]))}
            className="inset-x-0 bottom-0 mx-auto hidden"
            type="file"
            ref={hiddenFileInput}
          />
          <label className="mb-1 text-lg" htmlFor="content">
            Cover Image
          </label>
          <div className="relative mb-6 mr-4 h-40 w-full shrink-0 border px-4 py-2">
            <Image
              src={cover}
              width={160}
              height={160}
              className="absolute inset-0 h-40 w-full shrink-0 object-cover"
              alt="cover"
            />
            <button
              onClick={(e) => (setChanged(true), handleClick(e))}
              className="absolute inset-0 m-auto h-max w-max bg-black/60 px-6 py-3 text-xs text-white backdrop-blur-sm"
            >
              Change Cover
            </button>
          </div>
          <label className="mb-1 text-lg" htmlFor="content">
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

          <button className="mb-2 w-max bg-black px-8 py-4 text-sm text-white">Publish This Post</button>
        </form>
      </div>
    </div>
  );
}
