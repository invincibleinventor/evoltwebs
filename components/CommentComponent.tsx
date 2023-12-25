'use client'

import { useState } from "react"

export default function CommentComponent(props){
    const [liked,toggleLiked] = useState(props.liked)
    const [likes,setLikes] = useState(props.likes)
    
    return(
        <div className="flex flex-row gap-4 my-2">
<div className="w-10 h-10 shrink-0">
    <img className="w-8 h-8 mx-auto my-auto border border-gray-150 shrink-0" src={props.profile}/>
</div>
<div className="flex flex-col gap-[2px]">
    <h1 className="text-base font-semibold">{props.name}</h1>
    <h1 className="text-sm font-normal text-gray-800">{props.content}</h1>
    <div className="flex flex-row items-center content-center my-1 mt-2 space-x-[6px]">
    <svg onClick={()=>toggleLiked(!liked)} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 48 48">{liked?<path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/>:<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/>}</svg>
   <h1 className="text-xs">{likes} Likes</h1>
    </div>
</div>
        </div>
    )
}