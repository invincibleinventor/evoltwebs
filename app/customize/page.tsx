"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { redirect } from "next/navigation";

import { useEffect, useRef, useState } from "react";
export default function Create() {
  const supabase = createClient();
  const hiddenFileInput = useRef<HTMLInputElement | any>();
  const hiddenProfileInput = useRef<HTMLInputElement | null>();
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };
  const handleProfileClick = () => {
    hiddenFileInput.current?.click();
  };
  const [changed, setChanged] = useState(false);
  const [changedprofile, setChangedProfile] = useState(false);
  const [file, setFile] = useState<any>();
  const [profile, setProfile] = useState();
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
            className="absolute px-6 py-3 text-xs text-white cursor-pointer left-2 top-2 w-max bg-black/60 drop-shadow-lg backdrop-blur-lg"
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
            onChange={(e:any) => {
              setCover(URL.createObjectURL(e.target.files![0]));
              setChanged(true);
              setFile(e.target.files[0]);
            }}
            className="absolute inset-x-0 bottom-0 hidden mx-auto"
            type="file"
            ref={hiddenFileInput}
          />
        </div>
      </div>

      <form
        className="flex flex-col justify-center w-full max-w-lg gap-2 mx-auto mt-0 animate-in text-foreground md:mt-28 md:px-10"
        action={create}
      >
        <label className="mx-6 text-base" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 mx-6 mb-4 text-sm bg-white border"
          name="name"
          defaultValue={name}
          placeholder="Please Type Out Your Display Name"
          required
          minLength={4}
          maxLength={20}
        />

        <label className="mx-6 text-base" htmlFor="content">
          About
        </label>
        <textarea
          defaultValue={about}
          onChange={(e) => setAbout(e.target.value)}
          className="px-4 py-2 mx-6 mb-4 text-sm bg-white border"
          name="content"
          placeholder="Please Type About Yourself"
          required
          minLength={24}
          maxLength={100}
        />

        <button className="px-8 py-4 mx-6 mb-2 text-xs text-white bg-black w-max">Save Your Changes</button>
      </form>
    </div>
  );
}
