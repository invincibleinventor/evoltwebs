'use client'
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Oval } from  'react-loader-spinner'

import { useEffect, useRef, useState } from "react"
export default function Create(){
    const supabase = createClient()
    const hiddenFileInput = useRef(null);
    const handleClick = (event:any) => {
      hiddenFileInput.current.click();
    };
   const [loading,setLoading] = useState(false)
   async function coverChange(file){
    const bucket = "covers"
    
    
    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload('/public/'+handle+'.jpg', file);

    // Handle error if upload failed
    if(error) {
      alert('Error uploading file.');
      return
      
    }else{
        const {error:es} = await supabase.from('user').update({'cover':'https://xiexuntwvmedvyxokvvf.supabase.co/storage/v1/object/public/covers/public/'+handle+'.jpg'}).eq('handle',handle)
    if(es){alert(es.message)}
return
    }
   }
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
          setCover(data[0]["cover"])
          
          }
        
      }
      get()
      
    },[])
   
    
    const [handle,setHandle] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [about,setAbout] = useState('')
    const [image,setImage] = useState('')
    const [cover,setCover] = useState('')
    
  
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
        
     <div className={`flex flex-col relative items-center mx-auto justify-center w-full h-screen `}>
    <div className="absolute top-0 w-full h-64 max-w-full px-4 py-4">
      <div className="relative w-full h-64">
        <div className="absolute top-0 bg-red-200 w-full rounded-lg h-[calc(52*4px)]">
          <img src={cover?cover:''} className="h-[calc(52*4px)] rounded-lg"></img>
        </div>
        <div onClick={handleClick} className="absolute px-6 py-3 text-xs text-white bg-black bg-opacity-50 rounded-lg cursor-pointer w-max drop-shadow-lg top-3 right-3">      <input id="fupload" className="hidden"/>
Change Cover Picture</div>
   
      <img src={image} className="absolute bottom-0 left-0 right-0 mx-auto rounded-lg h-28 w-28"/>
   
    <input onChange={(e)=>(coverChange(e.target.files[0]))} className="absolute bottom-0 left-0 right-0 hidden mx-auto" type="file" ref={hiddenFileInput}/> 
      </div>
      
    </div>

       
     <form
       className="flex flex-col justify-center w-full max-w-lg gap-2 px-10 mx-auto mt-24 md:mt-28 animate-in text-foreground"
       action={create}>
       
       <label className="text-md" htmlFor="name">
         Name
       </label>
       <input
        onChange={(e:any)=>setName(e.target.value)}
         className="px-4 py-2 mb-6 border rounded-md bg-inherit"
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
         className="px-4 py-2 mb-6 border rounded-md bg-inherit"
         name="content"
         placeholder="Please Type About Yourself"
         required
         minLength={24}
         maxLength={100}
       />
      
       <button className="px-8 py-4 mx-auto mb-2 text-white bg-red-400 rounded-full w-max text-foreground">
         Save Your Changes
       </button>
       
      
     </form>
   </div>
    )
}
