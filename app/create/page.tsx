'use client'
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
export default function Create(){
    const supabase = createClient()
    
    const [content,setContent] = useState('')
    const [title,setTitle] = useState('')
    async function create(){
      const {data:{user}} = await supabase.auth.getUser()
      const {data:u} = await supabase.from('user').select('handle').eq('id',user.id)
        const {data,error} = await supabase.from('posts').insert({handle:u[0]["handle"],content:content,title:title})
        if(error){
            alert(error.message)
console.log(error)
        }
        else{
            redirect('/')
        }
    }
    return(
          
     <div className={`flex flex-col justify-center h-screen  flex-1 gap-2 px-8 `}>
  
       
     <form
       className="flex flex-col justify-center flex-1 w-full gap-2 pr-5 my-auto animate-in text-foreground"
       action={create}>
       
     
       <label className="text-md" htmlFor="content">
         Title
       </label>
       <textarea
        onChange={(e:any)=>setTitle(e.target.value)}
         className="w-full px-4 py-2 mb-6 mr-4 border rounded-md bg-inherit"
         name="content"
         placeholder="Please Type Out Your Title (120 Characters)"
         required
         maxLength={120}
       />
       <label className="text-md" htmlFor="content">
         Content
       </label>
       <textarea
        onChange={(e:any)=>setContent(e.target.value)}
         className="w-full px-4 py-2 mb-6 mr-4 border rounded-md h-2/6 bg-inherit"
         name="content"
         placeholder="Please Type Out Your Content"
         required
         maxLength={2000}
       />
       
       <button className="px-8 py-4 mb-2 text-white bg-red-400 rounded-full w-max text-foreground">
         Publish This Post
       </button>
       
      
     </form>
   </div>
    )
}
