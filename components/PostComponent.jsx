import Link from "next/link"
export default function Post(props){
    let s = props.description;
    if(s.length>120){
        s=s.slice(0,120)
        s+="..."
    }
   return(
      <Link href={`/post/${props.id}`}>
        <div className="w-full">
            <div className="flex flex-row gap-4 px-8 py-3">
                <Link href={`/profile/${props.handle}`} className="flex flex-col shrink-0">
                    <img className="w-10 h-10 rounded-lg shrink-0" src={props.dp}></img>
                    
                </Link>
                
                <div className="flex flex-col gap-[2px]">
                    
                   <div className="flex flex-row items-center content-center flex-1 gap-2 py-0 rounded-lg">
                    <h1 className="text-xs font-medium text-black">{props.name}</h1>
                    <h1 className="text-xs font-normal text-gray-600">@{props.handle}</h1>
                    </div>
                <Link href={'/profile/'+props.handle} className="flex flex-row justify-between my-1 mb-0 ">
                <h1 className="font-semibold ">{props.title}</h1>

                </Link>

                <h1 className="text-sm font-normal leading-relaxed text-gray-900">{s}</h1>
                <img src={props.image} className={props.image?`w-44 h-[calc(34.571*4px)] my-4 rounded-lg md:w-56 md:h-48`:'hidden'}></img>
                </div>
            </div>
        </div>
      </Link>
      )
}
