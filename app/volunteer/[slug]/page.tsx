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
let d;let a
  const fetch = (async()=>{
    const {data,error} = await supabase.from('volunteer').select('*').eq('id',params.slug)
    if(error){
      console.log(error)
    }
    else{
      d = data[0]
      a=data.length
    
    }
  })
  
  await fetch()
 
  const close = async (formData: FormData) => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
   }

  return a>0 ? (
    <div className="flex flex-col w-screen p-10 py-10 animate-in sm:max-w-4xl">
         
      <div className='flex flex-row items-center content-center gap-6 mx-auto ml-0 w-max md:mx-0 md:ml-0 '>
<img className='w-16 h-16 rounded-full' src={d.pic}></img>
<div className='flex flex-col gap-[10px]'>
    <h1 className='text-xl font-bold'>{d.name}</h1>
    <p className='px-4 py-2 text-xs font-medium text-blue-600 bg-blue-100 rounded-md w-max border-neutral-300'>{d.area}</p>
   </div>
</div>
<div className="flex flex-col gap-4 mt-10 font-semibold text-justify">
    <div className='flex flex-col gap-2'>
<p className='mb-0 font-semibold rounded-md text-md w-max'>About Me</p>

<p className='w-full text-sm font-normal leading-relaxed rounded-md multiLineLabel'>{d.description}</p>
</div>
<div className='flex flex-col gap-2'>

<p className='mb-0 font-semibold rounded-md text-md w-max'>Services I Offer</p>

<p className='w-full text-sm font-normal rounded-md multiLineLabel'>{d.services}</p>
</div>
<div className='flex flex-col gap-2'>


<p className='mb-0 font-semibold rounded-md text-md w-max'>Available Timings</p>

<p className='w-full text-sm font-normal rounded-md multiLineLabel'>{d.time}</p>

</div>
<div className='flex flex-col gap-2'>
<p className='mb-0 font-semibold rounded-md text-md w-max'>Contact</p>
<p className='w-full text-sm font-normal rounded-md multiLineLabel'>+91 {d.contact}</p>
{ d.contact2 &&
<p className='w-full text-sm font-normal rounded-md multiLineLabel'>+91 {d.contact2}</p>
}
</div>
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
