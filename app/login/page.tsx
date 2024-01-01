"use client";
import Link from "next/link";
import { Oval } from "react-loader-spinner";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";
export default function Login() {
  const supabase = createClient();
  async function check() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return window.location.replace("/editprofile");
    }
  }
  check();

  const signWithGoogle = async () => {
    const origin = window.location.origin;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    }

    return redirect(data.url);
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <form
        className="flex flex-col justify-center flex-1 w-full gap-2 my-auto animate-in text-foreground"
        action={signWithGoogle}
      >
        <button className="px-10 py-4 mx-auto mb-2 text-sm text-white bg-black w-max text-foreground">
          Sign In With Google
        </button>
      </form>
    </div>
  );
}
