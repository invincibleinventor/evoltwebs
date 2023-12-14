import Link from "next/link"
export default function Post(props){
   return(
      <Link href={`/post/${props.id}`}>
        <div className="w-full">
            <div className="flex flex-row gap-4 px-8 py-3">
                <Link href={`/profile/${props.handle}`} className="flex flex-col shrink-0">
                    <img className="w-10 h-10 rounded-lg shrink-0" src={props.dp}></img>
                    
                </Link>
                
                <div className="flex flex-col gap-[2px]">
                <Link href={'/profile/'+props.handle} className="flex flex-row items-center content-center gap-1">
                    <h1 className="text-sm font-bold">{props.name}</h1>
                    <h1 className="text-sm font-normal text-neutral-500">@{props.handle}</h1>
                </Link>
                <h1 className="text-sm font-normal text-neutral-900">{props.description}</h1>
                <img src={props.image} className={props.image?`w-44 h-[calc(34.571*4px)] my-4 rounded-lg md:w-56 md:h-48`:'hidden'}></img>
                </div>
            </div>
        </div>
      </Link>
      )
}
