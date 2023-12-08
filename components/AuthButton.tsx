import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthButton() {
  
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const signOut = async () => {
   

   
   
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className="flex items-center gap-2 ml-2">
      <span className="hidden md:block">Hey, {user.email}!</span>
      <form action={signOut}>
        <button className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
      <Link
      href="/dashboard"
      className="flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
    >
      My Profile
    </Link>
    </div>
  ) : (
    <Link
      href="/login"
      className="flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}
