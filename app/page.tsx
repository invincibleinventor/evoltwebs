'use client'

  import { createClient } from '@/utils/supabase/client' 
import StoriesView from '@/components/StoriesView'
import { useEffect, useLayoutEffect, useState } from 'react'
import PostComponent from '@/components/PostComponent'
import { redirect } from 'next/navigation'
export default function Index() {
  const supabase = createClient()
const canInitSupabaseClient = () => {
  // This function is just for the interactive tutorial.
  // Feel free to remove it once you have Supabase connected.
  try {
    createClient()
    return true
  } catch (e) {
    return false
  }
}

const isSupabaseConnected = canInitSupabaseClient()
const [posts,setPosts] = useState([])
const [loading,setLoading] = useState(true)
useEffect(()=>{
async function get(){
    
  const {data,error} = await supabase.from('posts').select('*').order('id',{ascending:false})
  if(error){
    console.log(error)
  }
  else{
    console.log(data)
   let ds = data
 setPosts(ds)
    
    console.log(ds)
    console.log(posts)
    setLoading(false)
  }
  }
get()},[])
  if(isSupabaseConnected){
  

  return(<div className='flex-1 h-screen p-2 overflow-x-hidden overflow-y-hidden'>
  <div className="lg:w-[420px] mx-2 bg-white bg-opacity-50 p-4 py-2 pb-4">
    <div className="relative items-center content-center">
    <svg viewBox="0 0 24 24" aria-hidden="true" className=" top-0 bottom-0 my-auto absolute ml-6 w-[18px] h-[18px] text-red-400"><g><path fill="currentColor" d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
    <input className="w-full shadow-lg bg-red-50 peer bg-opacity-10 rounded-full h-12 focus:outline-red-400 focus:bg-white placeholder:text-neutral-600 font-poppins pl-14 pr-8 text-[14px]" placeholder="Search Evolt"></input>
    </div>
</div>
  <div className='h-full overflow-y-scroll hiddenscroll'>
  
  <div className='flex flex-col gap-2 animate-in mb-20 hiddenscroll'>
    
  {!loading ? ( posts.map((post) => (
<PostComponent id={post.id} key={post.id} image={post.image} dp={post.dp} handle={post.handle} name={post.name} description={post.content}/>
 ))):<h1>Loading...</h1>} </div> </div></div>

  ) }else{}}
