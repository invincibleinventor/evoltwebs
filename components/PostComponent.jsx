import Link from "next/link"
export default function Post(props){
    let s = props.description;
    if(s.length>120){
        s=s.slice(0,120)
        s+="..."
    }
   return(
      <Link className="" href={`/post/${props.id}`}>
        <div className="w-full">
            
            <div className="grid items-center content-center gap-6 px-8 py-6 md:gap-10 sm:grid-cols-2">
<div className="bg-black rounded-lg ">
    <img className="object-cover w-full rounded-lg h-44" src="https://picsum.photos/300/400"></img>
</div>
                <div className="flex flex-col gap-[8px] px-2">
                <Link href={`/profile/${props.handle}`} className="flex flex-row items-center content-center gap-2 shrink-0">
                    <img className="w-5 h-5 rounded-md shrink-0" src={props.dp}></img>
                
                    <div className="flex flex-row gap-[2px]">
                    
                    <Link href={"/profile/"+props.handle} className="flex flex-row items-center content-center flex-1 gap-1 py-0 rounded-lg">
                     <h1 className="text-xs font-medium text-black ">{props.name}</h1>
                     <h1 className="text-xs font-normal text-gray-600 ">@{props.handle}</h1>
                     </Link>
                     </div>    
                     <div className="ml-auto">                     <h1 className="text-xs font-normal text-gray-600">{props.time}</h1></div>
                </Link>
                
                    <div>
                <div className="flex flex-row justify-between my-2 ">
                <h1 className="font-semibold ">{props.title}</h1>   

                </div>

                <h1 className="text-xs font-normal leading-[20px] text-gray-900 md:leading-[25px] md:text-sm">{s}</h1>
            </div>
                </div>
                
            </div>
            <div className="border-b-[1px] border-b-gray-300 mt-1 rounded-b-lg shadow-lg h-[1px] w-full"></div>
        </div>
      </Link>
      )
}
