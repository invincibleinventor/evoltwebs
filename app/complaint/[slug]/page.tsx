import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Error from 'next/error'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
export default async function Page({ params }: { params: { slug: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()
let d;let a;let isauthor=false;let isopen=true;let closed;let closedtext='Close'

  const fetch = (async()=>{
    const {data,error} = await supabase.from('issues').select('*').eq('id',params.slug)
    if(error){
      console.log(error)
    }
    else{
      d = data[0]
      a=data.length
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if(a){
        if(user){
   if(d.uid==user.email){
    isauthor=true
    console.log(d.uid)
    console.log(user.email)
   }}
   if(d.isopen==true){
    isopen=true
    closed="hidden"
   }
   else{
    closed="bg-neutral-500 hover-neutral-400 hover:cursor-pointer"
    closedtext="Resolved"
   }
      }
   console.log(isauthor,isopen)
    }
  })
  
  await fetch()
 
  const close = async (formData: FormData) => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    if(isopen && isauthor) {
      const {error} = await supabase.from('issues').upsert({id:params.slug,isopen:false,priority:'Closed'})
    

    if (error) {
      console.log(error)
        return redirect('/login?message=Could not authenticate user')
    }
  }
  else{
    return redirect('/complaint/'+params.slug);
}}

  return a>0 ? (
    <div className="flex flex-col w-screen p-10 py-10 animate-in sm:max-w-4xl">
            {<>
       <form
       className="flex flex-row items-center content-center w-full mb-6 md:justify-between animate-in text-foreground"
       action={close}
     >
<p className={`px-3 py-2 mr-2 text-xs font-medium text-white bg-blue-600 rounded-md ${d.isverified?``:`hidden`}`}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18Zm-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774l.701-.84Z" clip-rule="evenodd"/></svg></p>

      <button
        
        className={`flex items-center px-4 py-2 text-sm font-semibold md:ml-auto   text-white w-max hover-neutral-900 no-underline bg-black rounded-md text-foreground group ${closed}`}
      >{closedtext}</button></form></>}
      <div className='flex content-center fex-col-reverse2'>

    <h1 className='text-xl font-bold'>{d.name}</h1>
   
</div>
<div className="flex flex-row items-center content-center gap-6 mt-4 font-semibold text-justify">
<p className='px-4 py-2 font-medium text-blue-600 bg-blue-100 rounded-md text-md w-max border-neutral-300'>{d.area}</p>

<p className='text-md'>+91 {d.contact}</p>


</div>
<div className="mt-4">

<span

className="w-full rounded-md multiLineLabel"



>{d.concern}</span>

</div>
    </div>
  ) : (
      <><h1 className="mx-4 text-center">The complaint no longer exists. It must have been deleted by the author or removed by our system.</h1><Link
        href="/"
        className="flex items-center px-4 py-2 mx-auto mt-5 text-sm no-underline rounded-md left-8 top-24 text-foreground bg-btn-background hover:bg-btn-background-hover group w-max"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link></>
  )
}
