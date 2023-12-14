'use client'
import { Oval } from "react-loader-spinner"
import PostComponent from "@/components/PostComponent"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
export default function Page({ params }: { params: { slug: string } }) {
    const router = useRouter()
    const supabase = createClient()
    const [image,setImage] = useState('')
const [about,setAbout] = useState('')
const [loading,setLoading]  = useState(true)
    const [name,setName] = useState('')
    const [following,setFollowing] = useState(0)
    const [imfollowing,setImFollowing] = useState(false)
    const [followers,setFollowers] = useState(0)
    const [followerlist,setFollowerList] = useState([])
    const [followinglist,setFollowingList] = useState([])
    const [found,setFound] = useState(true)
    const [myself,setMyself] = useState(false)
    const [myId,setMyId] = useState('')
    useEffect(()=>{
        async function get(){
            const {data:{session}} = await supabase.auth.getSession()
        
        const {data:pd,error:pe} = await supabase.from('user').select('*').eq('handle',params.slug)
            if(pe){
                
                setFound(false)
            }
            else{if(pd){
 {               
                setName(pd[0].name)
                setAbout(pd[0].about)
                setImage(pd[0].image)
                setFollowers(pd[0].followers.length)
                setFollowing(pd[0].following.length)
                
                if(session){
                    const {data,error} = await supabase.from('user').select('*').eq('id',session.user.id)
                    
                        setMyId(data[0].handle)
                        setFollowerList(pd[0].followers)
                        setFollowingList(data[0].following)
                        if(data[0].handle==params.slug){
                            setMyself(true)
                            setLoading(false)
                        }
                    else if(pd[0].followers.includes(data[0].handle)){
                        
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
    async function onfollow(){
        if(myself){
            router.push('/customize')
        }
        else{
        if(followerlist.includes(myId)){
            console.log('uesuesues')
            let arr = followerlist
             console.log('before')
            console.log(arr)
             arr = arr.filter(item => item !== myId)
            let arr2 = followinglist
            arr2 = arr2.filter(item => item !== params.slug)

            console.log(arr)
            const {data,error}  = await supabase.from('user').update({'followers':arr}).eq('handle',params.slug).select()
            const {data:me,error:mee}  = await supabase.from('user').update({'following':arr2}).eq('handle',myId).select()
            if(error){
        console.log(error)
    }
    else{
        console.log(data)
    }
    setFollowerList(arr)
    setFollowingList(arr2)
    setImFollowing(false)}
    else{
        let arr = followerlist
        arr.push(myId)
        let arr2 = followinglist
        arr2.push(params.slug)
        console.log(arr)
        const {data,error}  = await supabase.from('user').update({'followers':arr}).eq('handle',params.slug).select()
        const {data:me,error:mee}  = await supabase.from('user').update({'following':arr2}).eq('handle',myId).select()
        if(error){
            console.log(error)
        }
        else{
            console.log(data)
        }    setImFollowing(true)
    setFollowerList(arr)
    setFollowingList(arr2)

}}
}
    return !loading ? (
        
  <div className='flex-1 h-screen p-0 overflow-x-hidden overflow-y-hidden'>
    
        <div className="relative h-64">
        <div className="h-48 m-4 bg-red-200 rounded-lg shadow-lg w-[calc(100%)-32px]"></div>
        <img className="absolute w-24 h-24 rounded-lg shadow-lg bottom-5 md:left-12 left-6" src={image}></img>
        <button onClick={()=>onfollow()}className={`absolute rounded-full text-xs font-bold bottom-10 md:right-12 right-6 px-8 py-3 shadow-lg ${!(imfollowing || myself)?'bg-red-400 text-white border-2 border-red-400':'bg-white text-red-500 border-2 border-red-400'}`}>{myself?'Edit Profile':imfollowing?'Unfollow':'Follow'}</button>
        </div>
        <div className="flex flex-col gap-2 ml-8 md:ml-14">
        <div className="flex flex-row items-center content-center gap-2 ">
            <h1 className="text-xl font-semibold">{name}</h1>
            <h1 className="text-xs font-normal text-neutral-400">@{params.slug}</h1>
        </div>
        <h1 className="pr-12 text-sm font-normal leading-relaxed text-neutral-400">{about}</h1>
</div>
<div className="flex flex-row items-center content-center gap-6 px-4 py-4 mx-8 my-4 mb-1 border rounded-lg md:mx-14 border-neutral-700">
<div className="flex flex-row w-full md:mx-auto">
<div className="flex flex-col items-center content-center gap-1 mx-auto w-max">
<h1 className="text-xs font-semibold">Followers</h1>
<h1 className="text-sm font-medium text-gray-700">{followers} Followers</h1>

    </div>
    <div className="flex flex-col items-center content-center gap-1 mx-auto w-max">
<h1 className="text-xs font-semibold">Following</h1>
<h1 className="text-sm font-medium text-gray-700">{following} Following</h1>

    </div>
</div>
</div>
<h1 className="my-4 mb-1 ml-8 text-xl font-semibold md:ml-14">Posts</h1>
<Link href={'/posts/'+params.slug}>
<div className="px-6 py-3 mx-8 my-4 border rounded-lg border-neutral-400 md:mx-14">
<h1 className="text-sm font-medium text-neutral-900">View All Posts By {name}{"⠀"}&gt;</h1>

</div>
</Link>
    </div>) :(<div className="flex items-center content-center w-full h-screen">
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
</div>)
}
