'use client'
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
    useEffect(()=>{
        async function get(){
            const {data:{session}} = await supabase.auth.getSession()
        
        const {data:pd,error:pe} = await supabase.from('user').select('*').eq('handle',params.slug)
            if(pe){
                console.log(pe)
                setFound(false)
            }
            else{
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
    }
    get()
    },[imfollowing])
    return !loading ? (<div className="flex flex-col">
        <div className="relative h-64">
        <div className="w-full h-48 bg-blue-400"></div>
        <img className="absolute w-24 h-24 rounded-lg bottom-5 md:left-12 left-6" src={image}></img>
        <button className={`absolute rounded-full text-xs font-bold bottom-9 md:right-12 right-6 px-8 py-4 ${!imfollowing?'bg-red-400 text-white border-2 border-red-400':'bg-white text-red-500 border-2 border-red-400'}`}>{imfollowing?'Unfollow':'Follow'}</button>
        </div>
        <div className="flex flex-col gap-2 ml-6 md:ml-12">
        <div className="flex flex-row items-center content-center gap-2 ">
            <h1 className="text-xl font-semibold">{name}</h1>
            <h1 className="text-sm font-normal text-neutral-400">@{params.slug}</h1>
        </div>
        <h1 className="text-sm font-normal text-neutral-400">{about}</h1>
</div>
    </div>) : (<>Loading...</>)
}