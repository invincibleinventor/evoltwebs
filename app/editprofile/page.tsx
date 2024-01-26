"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";
export default function Create() {
  const supabase = createClient();

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
          if (data && data.length > 0) {
            window.location.replace("/");
          } else {
            if (user.email) {
              setEmail(user.email);
              setImage(user.user_metadata.avatar_url);
            }
          }
        }
      }
    }
    get();
  });

  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");

  async function create() {
    const { data } = await supabase.from("user").select("*").eq("handle", handle);
    if (data && data.length > 0) {
      alert("Handle Already Exists");
    } else {
      const { error } = await supabase.from("user").insert({
        email: email,
        name: name,
        handle: handle.toLowerCase(),
        about: about,
        image: image,
        followers: [],
        following: ["evolt"],
        bookmarks: [],
        liked: [],
        private: false,
      });
      if (error) {
        console.log(error);
      } else {
        window.location.replace("/");
      }
    }
  }
  return (
    <div className={`mx-auto flex h-screen w-full max-w-lg flex-col items-center justify-center px-10 `}>
      <form
        className="flex flex-col justify-center w-full gap-2 pr-10 my-auto ml-auto animate-in text-foreground"
        action={create}
      >
        <label className="text-base" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 mb-6 mr-4 border bg-inherit"
          name="name"
          placeholder="Please Type Out Your Display Name"
          required
          minLength={4}
          maxLength={20}
        />
        <label className="text-base" htmlFor="name">
          Handle - You cannot change this later
        </label>
        <input
          onChange={(e) => setHandle(e.target.value.trim().replace(" ", "_"))}
          className="px-4 py-2 mb-6 mr-4 border bg-inherit"
          name="handke"
          placeholder="Please Type Out Your Handle"
          required
          minLength={4}
          maxLength={12}
        />
        <label className="text-base" htmlFor="content">
          About
        </label>
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          className="px-4 py-2 mb-6 mr-4 border bg-inherit"
          name="content"
          placeholder="Please Type About Yourself"
          required
          minLength={24}
          maxLength={100}
        />

        <button className="px-8 py-4 mb-2 text-xs text-white bg-black w-max">Setup Your Account</button>
      </form>
    </div>
  );
}
