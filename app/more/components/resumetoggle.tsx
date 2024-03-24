'use client'
export default function Toggle(props:any){
    return(
        <button className="px-6 py-3 text-xs text-white bg-black w-max">{props.isresume?"Edit Resume":"Setup Resume"}</button>
    )
}