import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function justredirect() {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data } = await supabase
    .from("user")
    .select("handle")
    .eq("id", session?.user.id);
  if (data) {
    redirect("/profile/" + data[0].handle);
  }
}
