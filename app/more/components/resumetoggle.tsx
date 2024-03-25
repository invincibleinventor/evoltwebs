'use client'

import Link from "next/link"

export default function Toggle(props:any){
    return(
        <Link className="px-6 py-3 text-xs text-white bg-black w-max" href={props.isresume?"/editresume":'/setupresume'}>{props.isresume?"Edit Resume":"Setup Resume"}</Link>
    )
}