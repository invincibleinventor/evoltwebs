import Link from "next/link"
export default function Post(props){
    let s = props.description;
    let count = s.split(" ").length - 1
    if(count<=3){
        var parts = s.match(/.{1,10}/g);
        s = parts.join(" ");
    }
    if(s.length>100){
        s=s.slice(0,100)
        s+="..."
    }
   return(
      <Link className="animate-in" href={`/post/${props.id}`}>
        <div className="w-full px-5 py-[6px]">
            
            <div className="grid items-center content-center gap-[4px] bg-white border rounded-md border-gray-150 md:gap-4 sm:grid-cols-2">
<div className="bg-black rounded-md ">
    <img className="object-cover w-full h-[204px] rounded-t-lg md:rounded-l-lg md:rounded-tr-none" src="https://picsum.photos/300/400"></img>
</div>
                <div className="flex flex-col    gap-[8px] px-6 py-5">
                <Link href={`/profile/${props.handle}`} className="flex flex-row items-center content-center gap-2 shrink-0">
                    <img className="w-5 h-5 rounded-sm shrink-0" src={props.dp}></img>
                
                    <div className="flex flex-row gap-[2px]">
                    
                    <Link href={"/profile/"+props.handle} className="flex flex-row items-center content-center flex-1 gap-1 py-0 rounded-lg">
                     <h1 className="text-xs font-medium text-black ">{props.name}</h1>
                     <h1 className="text-xs font-normal text-gray-600 ">@{props.handle}</h1>
                     </Link>
                     </div>    
                     <div className="ml-auto">                     <h1 className="text-xs font-normal text-gray-600">{props.time}</h1></div>
                </Link>
                
                    <div>
                <div className="flex flex-row justify-between my-2 mb-[6px] ">
                <h1 className="text-lg font-bold md:text-base md:font-semibold ">{props.title}</h1>   

                </div>

                <h1 className="text-xs font-normal leading-[20px] text-gray-900 md:leading-[25px] md:text-sm">{s}</h1>
            </div>
                </div>
                
            </div>
              </div>
      </Link>
      )
}
