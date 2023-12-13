'use client'
import PostComponent from "@/components/PostComponent"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
export default function Page({ params }: { params: { slug: string } }) {
    const supabase = createClient()
    const [image,setImage] = useState('')
const [about,setAbout] = useState('')
const [loading,setLoading]  = useState(true)
    const [name,setName] = useState('')
    const [following,setFollowing] = useState(0)
    const [imfollowing,setImFollowing] = useState(false)
    const [followers,setFollowers] = useState(0)
    const [found,setFound] = useState(true)
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        async function get(){
            const {data,error} = await supabase.from('posts').select('*').eq('handle',params.slug)
            setPosts(data)
        }
        get()
    },[])
    useEffect(()=>{
        async function get(){
            const {data:{session}} = await supabase.auth.getSession()
        
        const {data:pd,error:pe} = await supabase.from('user').select('*').eq('handle',params.slug)
            if(pe){
                console.log(pe)
                setFound(false)
            }
            else{if(pd){
 {               console.log(pd)
                setName(pd[0].name)
                setAbout(pd[0].about)
                setImage(pd[0].image)
                setFollowers(pd[0].followers)
                setFollowing(pd[0].following)
                if(session){
                    const {data,error} = await supabase.from('user').select('*').eq('id',session.user.id)
                    if(data[0].handle in pd[0].followers){
                        setImFollowing(true)
                        setLoading(false)
                    }
                    else{
                        setImFollowing(false)
                        setLoading(false)
                    }
                }
            }
              }  }}
    get()
    },[imfollowing])
    return !loading ? (<div className="flex flex-col">
        <div className="relative h-64">
        <div className="h-48 m-4 bg-red-200 rounded-lg shadow-lg w-[calc(100%)-32px]"></div>
        <img className="absolute w-24 h-24 rounded-lg shadow-lg bottom-2 md:left-12 left-6" src={image}></img>
        <button className={`absolute rounded-full text-xs font-bold bottom-7 md:right-12 right-6 px-8 py-3 shadow-lg ${!imfollowing?'bg-red-400 text-white border-2 border-red-400':'bg-white text-red-500 border-2 border-red-400'}`}>{imfollowing?'Unfollow':'Follow'}</button>
        </div>
        <div className="flex flex-col gap-2 mt-2 ml-8 md:ml-14">
        <div className="flex flex-row items-center content-center gap-2 ">
            <h1 className="text-xl font-semibold">{name}</h1>
            <h1 className="text-xs font-normal text-neutral-400">@{params.slug}</h1>
        </div>
        <h1 className="pr-12 text-sm font-normal leading-relaxed text-neutral-400">{about}</h1>
</div>
<h1 className="my-4 mb-1 ml-8 text-xl font-semibold">Posts</h1>
<div className='flex flex-col gap-2 animate-in hiddenscroll'>
    
    {!loading ? ( posts.map((post) => (
  <PostComponent id={post.id} key={post.id} image={post.image} dp={post.dp} handle={post.handle} name={post.name} description={post.content}/>
   ))):<h1>Loading...</h1>} </div> 
    </div>) : (<>Loading...</>)
}