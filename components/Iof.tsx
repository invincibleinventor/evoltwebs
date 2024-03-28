'use client';
export default function Iof(props:any){
    return(
        <img onClick={()=>window.open(props.src,'_blank')?.focus()} className="w-full border rounded-md h-max aspect-video" src={props.src}></img>

    )
}