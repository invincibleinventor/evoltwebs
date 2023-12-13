'use client'
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
export default function Create(){
    const supabase = createClient()
   
    useEffect(()=>{
      async function get(){
        const {data:{user},error} = await supabase.auth.getUser()
        if(error){
          redirect('/login')
        }
        else{
          const {data,error} = await supabase.from('user').select('*').eq('id',user.id)
          if(data && data.length>0){
            redirect('/')
          }else{
          setEmail(user.email)
          setImage(user.user_metadata.avatar_url)
          }
        }
      }
      get()
    })
   
    
    const [handle,setHandle] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [about,setAbout] = useState('')
    const [image,setImage] = useState('')
    
    const [content,setContent] = useState('')
   async function create(){
    const {data,error} = await supabase.from('user').select('*').eq('handle',handle)
    if(data.length>0){
      alert('Handle Already Exists')
    }
    else{
      const {data,error} = await supabase.from('user').insert({email:email,name:name,handle:handle,about:about,image:image,followers:[],following:[],bookmarks:[],liked:[],private:false})
    if(error){
      console.log(error)
    }
    else{
      window.location.replace('/')
    }
    }
   }
    return(
        
     <div className={`flex flex-col justify-center h-screen flex-1 gap-2 px-8 `}>
  
       
     <form
       className="flex flex-col justify-center max-w-lg gap-2 my-auto x-auto animate-in text-foreground"
       action={create}>
       
       <label className="text-md" htmlFor="name">
         Name
       </label>
       <textarea
        onChange={(e:any)=>setName(e.target.value)}
         className="w-full px-4 py-2 mb-6 border rounded-md bg-inherit"
         name="name"
         placeholder="Please Type Out Your Display Name"
         required
         minLength={4}
         maxLength={20}
       />
       <label className="text-md" htmlFor="name">
         Handle
       </label>
       <textarea
        onChange={(e:any)=>setHandle(e.target.value)}
         className="px-4 py-2 mb-6 border rounded-md bg-inherit"
         name="handke"
         placeholder="Please Type Out Your Handle"
         required
         minLength={5}
         maxLength={20}
       />
         <label className="text-md" htmlFor="content">
         About
       </label>
       <textarea
        onChange={(e:any)=>setAbout(e.target.value)}
         className="px-4 py-2 mb-6 border rounded-md bg-inherit"
         name="content"
         placeholder="Please Type About Yourself"
         required
         minLength={4}
         maxLength={200}
       />
      
       <button className="px-8 py-4 mb-2 text-white bg-red-400 rounded-full w-max text-foreground">
         Setup Your Account
       </button>
       
      
     </form>
   </div>
    )
}