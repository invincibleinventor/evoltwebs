'use client'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Link from "next/link";
import { Oval } from 'react-loader-spinner'
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
TimeAgo.locale(en)

const timeAgo = new TimeAgo('en-US')
const date1 = new Date();
const isSupabaseConnected = canInitSupabaseClient()
const [empty,setEmpty] = useState(true)
  const [posts,setPosts] = useState([])
const [loading,setLoading] = useState(true)
useEffect(()=>{
  async function get(){
    const {data:user} = await supabase.auth.getUser()
    let s = user.user.id
    const {data:u} = await supabase.from('user').select('*').eq('id',s)
    let l = u[0]["following"]
    let h = u[0]["handle"]
    let ds=[]
    
      l.push(h)
    const {data,error} = await supabase.from('posts').select('*').order('id',{ascending:false}).in('handle',l) 
    if(error){
      console.log(error)
    }
    else{
      console.log(data)
     ds = data
      
     for await (const [index,post] of ds.entries()) {
     
        const {data,error} = await supabase.from('user').select('*').eq('id',post.poster)
        ds[index].name = data[0].name
        let date2 = new Date(ds[index].created_at)
        ds[index].diff = date1.getTime()-date2.getTime()
        ds[index].dp = data[0].image
        
       
        
      
     
      }
      
    
      if(ds.length>0){
        setEmpty(false)
      }
      else{
        setEmpty(true)
      }
       setPosts(ds);setLoading(false)
      
      console.log(ds)
      console.log(posts)
    }


    
    }
get()},[])
  if(isSupabaseConnected){
  

  return(<div className='flex-1 h-screen p-0 py-2 overflow-x-hidden overflow-y-hidden'>
  <div className="p-4 py-2 pb-4 mx-2 bg-opacity-50 ">
    <div className="relative items-center content-center">
    <svg viewBox="0 0 24 24" aria-hidden="true" className=" top-0 bottom-0 my-auto absolute ml-6 w-[18px] h-[18px] text-red-400"><g><path fill="currentColor" d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
    <input className="w-full shadow-lg bg-red-50 peer bg-opacity-10 rounded-lg h-12 focus:outline-red-400 focus:bg-white placeholder:text-neutral-600 font-poppins pl-14 pr-8 text-[14px]" placeholder="Search Evolt"></input>
    </div>
</div>
  <div className='h-full overflow-y-scroll hiddenscroll'>
  
  <div className='flex flex-col gap-2 mb-20 animate-in hiddenscroll'>
    
  {!loading ? !empty ? ( posts.map((post) => (
<PostComponent id={post.id} title={post.title} time={timeAgo.format(Date.now() - post.diff)} key={post.id} image={post.image} dp={post.dp} handle={post.handle} name={post.name} description={post.excerpt}/>
 ))) : 
    (
      <div className="flex items-center content-center w-full px-10 mt-24 lg:px-24 sm:px-24 md:px-16">
            <div className="flex flex-col gap-2 mx-auto max-w-max">
            <h1 className="mx-auto text-lg font-semibold text-center text-black">No Posts To View!</h1>
            <h1 className="mx-auto text-sm text-center text-neutral-400">Follow people to view their posts on your home feed. The more people you follow, the more posts on your feed</h1>
            <Link href="/explore" className={`w-max mx-auto rounded-full text-xs font-bold mt-3 px-8 py-3 shadow-lg ${(1==1)?'bg-red-400 text-white border-2 border-red-400':'bg-white text-red-500 border-2 border-red-400'}`}>Explore People</Link>
      
            </div>
            
          </div>
    )
    :(<div className="flex items-center content-center w-full h-screen">
 <Oval
   height={80}
   width={80}
   color="#dc2626"
   wrapperStyle={{}}
   wrapperClass="mx-auto"
   visible={true}
   ariaLabel='oval-loading'
   secondaryColor="#f87171"
   strokeWidth={2}
   strokeWidthSecondary={2}
   
   />
</div>)} </div> </div></div>

  ) }else{}}
