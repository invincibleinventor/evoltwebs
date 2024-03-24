'use client'
export default function toggle(props:any){
    return(
        <button className="px-6 py-3 text-sm text-white bg-black">{props.isresume?"Edit Resume":"Setup Resume"}</button>
    )
}