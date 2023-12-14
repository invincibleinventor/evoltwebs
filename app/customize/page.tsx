'use client'
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Oval } from  'react-loader-spinner'

import { useEffect, useState } from "react"
export default function Create(){
    const supabase = createClient()
   const [loading,setLoading] = useState(false)
    useEffect(()=>{
      async function get(){
        const {data:{user},error} = await supabase.auth.getUser()
        if(error){
          redirect('/login')
        }
        else{
         
            
          const {data,error} = await supabase.from('user').select('*').eq('id',user.id)
          setName(data[0]["name"])
          setHandle(data[0]["handle"])
          setAbout(data[0]["about"])
          setImage(data[0]["image"])
          
          }
        
      }
      get()
      
    },[])
   
    
    const [handle,setHandle] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [about,setAbout] = useState('')
    const [image,setImage] = useState('')
    
  
   async function create(){
   
      const {data,error} = await supabase.from('user').update({name:name,about:about}).eq('handle',handle)
    if(error){
      console.log(error)
    }
    else{
      window.location.replace('/')
    }
    
   }
    return (
        
     <div className={`flex flex-col items-center max-w-lg px-10 mx-auto justify-center w-full h-screen `}>
  
       
     <form
       className="flex flex-col justify-center w-full gap-2 pr-10 my-auto ml-auto animate-in text-foreground"
       action={create}>
       
       <label className="text-md" htmlFor="name">
         Name
       </label>
       <textarea
        onChange={(e:any)=>setName(e.target.value)}
         className="px-4 py-2 mb-6 mr-4 border rounded-md bg-inherit"
         name="name"
         defaultValue={name}
         placeholder="Please Type Out Your Display Name"
         required
         minLength={4}
         maxLength={20}
       />
    
         <label className="text-md" htmlFor="content">
         About
       </label>
       <textarea
                defaultValue={about}

        onChange={(e:any)=>setAbout(e.target.value)}
         className="px-4 py-2 mb-6 mr-4 border rounded-md bg-inherit"
         name="content"
         placeholder="Please Type About Yourself"
         required
         minLength={24}
         maxLength={100}
       />
      
       <button className="px-8 py-4 mb-2 text-white bg-red-400 rounded-full w-max text-foreground">
         Save Your Changes
       </button>
       
      
     </form>
   </div>
    )
}
