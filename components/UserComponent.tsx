'use client'
import Link from 'next/link';
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"

export default function UserComponent(props){
    const supabase = createClient()
    async function onfollow(handle){
        
       
        if(imfollowing){
            console.log('uesuesues')
            let arr = followerlist
             console.log('before')
            console.log(arr)
             arr = arr.filter(item => item !== myId)
            let arr2 = followinglist
            arr2 = arr2.filter(item => item !== handle)

            console.log(arr)
            const {data,error}  = await supabase.from('user').update({'followers':arr}).eq('handle',handle).select()
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
        arr2.push(handle)
        console.log(arr)
        const {data,error}  = await supabase.from('user').update({'followers':arr}).eq('handle',handle).select()
        const {data:me,error:mee}  = await supabase.from('user').update({'following':arr2}).eq('handle',myId).select()
        if(error){
            console.log(error)
        }
        else{
            console.log(data)
        }    setImFollowing(true)
    setFollowerList(arr)
    setFollowingList(arr2)

}
}
    const [imfollowing,setImFollowing] = useState(props.isfollowing)
    const [followerlist,setFollowerList] = useState(props.followerlist)
    const [followinglist,setFollowingList] = useState(props.followinglist)
  let a = props.name
    if(a.length>=11){
a=a.slice(0,7)
        a+="..."
    }
    const [myId,setMyId] = useState(props.myID)
    return(
        <Link href={'/profile/'+props.handle} className="flex flex-col mx-auto xl:mx-2 my-2 border border-gray-150 h-[270.29px] xl:w-auto w-[303.86px] px-6 py-6">
            <div className="flex flex-row items-center content-center justify-between">
                <div className="flex flex-row items-center content-center space-x-5">
<img src={props.image} className="object-cover w-10 h-10"/>
<div className="flex flex-col space-y-[1px]">
<h1 className="text-base font-bold">{a}</h1>
<h1 className="text-xs font-normal">@{props.handle}</h1>
</div>
</div>
<button onClick={(e:any)=>(e.stopPropagation(),e.preventDefault(),onfollow(props.handle))} className={imfollowing?"px-5 py-2 h-max text-xs border border-black bg-white text-black":"px-5 py-2 h-max text-xs bg-black border border-black text-white"}>{imfollowing?'Unfollow':'Follow'}</button>
</div>
<div className="flex flex-row items-center content-center gap-6 px-4 py-4 mx-0 my-6 mb-4 border border-neutral-700">
<div className="flex flex-row w-full md:mx-auto">
<div className="flex flex-col items-center content-center gap-1 mx-auto w-max">
<h1 className="text-xs font-semibold">Followers</h1>
<h1 className="text-sm font-medium text-gray-700">{props.followers} Followers</h1>

    </div>
    <div className="flex flex-col items-center content-center gap-1 mx-auto w-max">
<h1 className="text-xs font-semibold">Following</h1>
<h1 className="text-sm font-medium text-gray-700">{props.following} Following</h1>

    </div>
</div>
</div>
<div className="w-full px-[2px] mt-0">
<h1 className="text-sm fix-overflow four-line-ellipsis">{props.about}</h1>
</div>
            
        </Link>
    )
}
