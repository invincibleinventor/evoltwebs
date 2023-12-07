import DeployButton from '../components/DeployButton'
 import AuthButton from '../components/AuthButton'
  import { createClient } from '@/utils/supabase/server' 
  import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps' 
import SignUpUserSteps from '@/components/SignUpUserSteps'
 import Header from '@/components/Header' 
 import { cookies } from 'next/headers'
  import { useState } from 'react'
import Link from 'next/link'

export default async function Index() {
   let urgent;let very;let moderate; const cookieStore = cookies() ;
   let a; 
   function ask(param:String){ 
    if(param=='Very Urgent'){ a='text-red-500 md:text-md text-xs' }
    else if(param=='Urgent'){ a='text-orange-400' } 
    else if(param=='Closed'){ a='text-green-500' } 
    else{ a='text-yellow-500' } 
     return 'inline-block px-4 py-1 bg-neutral-50 rounded-md '+a

}
const canInitSupabaseClient = () => {
  // This function is just for the interactive tutorial.
  // Feel free to remove it once you have Supabase connected.
  try {
    createClient(cookieStore)
    return true
  } catch (e) {
    return false
  }
}
const supabase = createClient(cookieStore)

const isSupabaseConnected = canInitSupabaseClient()
if(isSupabaseConnected){

const {data,error} = await supabase.from('issues').select('*').order('id', { ascending: false }).limit(10) 
let posts;data?posts=data:posts=[]
 if(posts){ moderate = posts.reduce(function(moderate, obj){ 
  if(obj.priority === 'Moderate'){ moderate.push(obj.id); } return moderate; }, []); 
  urgent = posts.reduce(function(urgent, obj){
     if(obj.priority === 'Urgent'){ urgent.push(obj.id); } return urgent; }, []); 
     very = posts.reduce(function(very, obj){ if(obj.priority === 'Very Urgent'){ very.push(obj.id); } 
     return very; }, []);

} return ( 
   <div className='grid grid-cols-1 gap-4 px-10 mb-10 xl:px-72 lg:px-64'>
    {posts?.length ? (posts.map((post: any) => (<Link href={`/complaint/${post.id}`} key={post.id}> <div className="w-full p-4 bg-white rounded-md animate-in ">
      <div className="flex flex-row items-center content-center justify-between mb-4"> <h1 className="text-lg font-bold">{post.name}</h1> <div className={ask(post.priority)}>

{post.priority}

</div>

</div>

<div className="flex flex-row items-center content-center gap-4 mb-4 font-semibold text-justify">
<p className='px-2 py-2 text-sm font-normal rounded-lg w-max bg-neutral-100'>{post.area}</p>

<p className='text-sm'>{post.contact}</p>


</div>

<div className="mt-4">

<span

className="w-full rounded-md multiLineLabel"



>{post.concern}</span>

</div>

</div></Link>))
    ) : (
      <div className='animate-in'>
        <h1>No Posts</h1>
      </div>
    )}
 
<div className="animate-in">
{isSupabaseConnected ?  <div>{}</div>:<div>An Internal Server Error Occured</div>} 
</div>
  </div>) }}
