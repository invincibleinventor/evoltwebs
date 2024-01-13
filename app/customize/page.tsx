"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { redirect } from "next/navigation";

import { useEffect, useRef, useState } from "react";
export default function Create() {
  const supabase = createClient();
  const hiddenFileInput = useRef<HTMLInputElement | null>();
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };
  const [changed, setChanged] = useState(false);
  const [file, setFile] = useState();
  async function coverChange() {
    console.log("here here");
    const bucket = "covers";

    // Call Storage API to upload file
    const { error } = await supabase.storage.from(bucket).upload("/public/" + handle + ".jpg", file, { upsert: true });

    // Handle error if upload failed
    if (error) {
      alert("Error uploading file.");
      return;
    } else {
      const { error: es } = await supabase
        .from("user")
        .update({
          cover: "https://xiexuntwvmedvyxokvvf.supabase.co/storage/v1/object/public/covers/public/" + handle + ".jpg",
        })
        .eq("handle", handle);
      if (es) {
        alert(es.message);
      }
      return;
    }
  }
  useEffect(() => {
    async function get() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        redirect("/login");
      } else {
        if (user) {
          const { data } = await supabase.from("user").select("*").eq("id", user.id);
          if (data) {
            setName(data[0]["name"]);
            setHandle(data[0]["handle"]);
            setAbout(data[0]["about"]);
            setImage(data[0]["image"]);
            setCover(data[0]["cover"] + "?" + new Date().getTime());
          }
        }
      }
    }
    get();
  }, []);

  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [cover, setCover] = useState("");

  async function create() {
    if (changed) {
      await coverChange();
    }

    const { error } = await supabase.from("user").update({ name: name, about: about }).eq("handle", handle);
    if (error) {
      console.log(error);
    } else {
      window.location.replace("/");
    }
  }
  return (
    <div className={`relative mx-auto flex h-screen flex-1 flex-col items-center justify-center overflow-hidden`}>
      <div className="absolute top-0 h-64 w-[calc(100%-20px)] max-w-full py-4 md:w-full md:px-4">
        <div className="relative h-64 w-[calc(100%)]">
          <div className="absolute top-0 h-[calc(52*4px)]  w-[calc(100%)] bg-gray-200">
            <Image
              width={200}
              height={200}
              src={cover ? cover : ""}
              className="h-[calc(52*4px)] w-full border border-gray-500 object-cover "
              alt="cover"
            />
          </div>
          <div
            onClick={handleClick}
            className="absolute left-2 top-2 w-max cursor-pointer bg-black/60 px-6 py-3 text-xs text-white drop-shadow-lg backdrop-blur-lg"
          >
            {" "}
            <input id="fupload" className="hidden" />
            Change Cover Picture
          </div>

          <Image
            width={110}
            height={110}
            src={image}
            className="absolute inset-x-0 bottom-0 mx-auto h-28 w-28"
            alt="image"
          />

          <input
            onChange={(e) => {
              setCover(URL.createObjectURL(e.target.files![0]));
              setChanged(true);
              setFile(e.target.files[0]);
            }}
            className="absolute inset-x-0 bottom-0 mx-auto hidden"
            type="file"
            ref={hiddenFileInput}
          />
        </div>
      </div>

      <form
        className="animate-in mx-auto mt-0 flex w-full max-w-lg flex-col justify-center gap-2 text-foreground md:mt-28 md:px-10"
        action={create}
      >
        <label className="mx-6 text-lg" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="mx-6 mb-4 border bg-white px-4 py-2"
          name="name"
          defaultValue={name}
          placeholder="Please Type Out Your Display Name"
          required
          minLength={4}
          maxLength={20}
        />

        <label className="mx-6 text-lg" htmlFor="content">
          About
        </label>
        <textarea
          defaultValue={about}
          onChange={(e) => setAbout(e.target.value)}
          className="mx-6 mb-4 border bg-white px-4 py-2"
          name="content"
          placeholder="Please Type About Yourself"
          required
          minLength={24}
          maxLength={100}
        />

        <button className="mx-6 mb-2 w-max bg-black px-8 py-4 text-xs text-white">Save Your Changes</button>
      </form>
    </div>
  );
}
