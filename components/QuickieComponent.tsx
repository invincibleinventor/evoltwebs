"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import BookMarksComponent from "./QuickieBookMarksComponent";
import LikeComponent from "./QuickieLikeComponent";
export default function Post(props:any) {
  let x = props.name;
  if (x.length >= 11) {
    x = x.slice(0, 4);
    x += "...";
  }
  const a = props.title;
let photocount;
  if(props.image){
photocount = props.image.length;
  }
  return (
    <div className="w-full animate-in" >
      <div className="w-full px-5 py-[6px]">
        <div  className="flex flex-col border border-gray-300 rounded-none bg-gray-50 md:gap-0">
          <div  className="flex items-center content-center bg-black rounded-md ">
            
          </div>
          <div className="flex h-max flex-col gap-[8px] md:p-6 p-4 ">
            <div className="flex flex-row items-center content-center gap-2 h-max shrink-0">
             <Link className="w-10 h-10" href={`/profile/`+props.handle}>
              <Image width={30} height={30} className="w-10 h-10 rounded-md shrink-0" src={props.dp} alt="dp" />
             </Link>
              <Link href={`/profile/`+props.handle} className="flex flex-row gap-[2px]">
                <div className="flex flex-col content-center flex-1 gap-[2px] py-0 pl-2 rounded-lg">
                  <div className="flex flex-row items-center content-center">
                  <h1 className="text-sm font-medium text-black "><span className="inline-block md:hidden">{x}</span><span className="hidden md:inline-block">{props.name}</span></h1>
                  <h1 className="ml-2 text-xs font-normal text-gray-600 ">@{props.handle}</h1>

                  </div>
                  <h1 className="text-xs font-medium text-gray-600">{props.time}</h1>

                </div>

              </Link>
              
              <div className="pl-3 ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 16.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"/></g></svg>
              </div>
            </div>

            <div>
              <Link  href={`/post/${props.id}`} className="my-3 mb-[6px] flex w-full flex-row justify-between ">
                <h1
                  style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  className="text-lg font-bold two-line-ellipsis md:text-lg md:font-semibold "
                >
                  {a}
                </h1>
              </Link>

              <Link
              href={'/quickie/'+props.id}
                style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                className="text-sm font-normal text-gray-900 four-line-ellipsis md:text-base"
              >
                {props.description}
              </Link>
              {photocount>0  &&
              <div className={photocount==1?"w-full border rounded-md mt-4 aspect-video h-full":"mt-4 md:gap-2 gap-1 grid-cols-2 grid"}>
                {props.image.map((image:string) => 
                  <img onClick={()=>window.open(image,'_blank')?.focus()} className="w-full border rounded-md h-max aspect-video" src={image}></img>
                )}
              </div>
}


              <div className="flex flex-row items-center content-center mt-6">
              <LikeComponent
          userliked={props.userliked}
          postid={props.id}
          handle={props.myhandle}
          likedlist={props.likedlist}
          liked={props.liked}
          likes={props.likedlist.length}
        />

        <BookMarksComponent
          userliked={props.userbookmarked}
          postid={props.id}
          handle={props.myhandle}
          likedlist={props.bookmarkedlist}
          liked={props.bookmarked}
          likes={props.bookmarkedlist.length}
        />
         <Link href={"/quickie/"+props.id} className="flex flex-row items-center content-center pl-6 pr-2 space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="m4 11.29l1-1v1.42l-1.15 1.14L3 12.5V10H1.5L1 9.5v-8l.5-.5h12l.5.5V6h-1V2H2v7h1.5l.5.5zM10.29 13l1.86 1.85l.85-.35V13h1.5l.5-.5v-5l-.5-.5h-8l-.5.5v5l.5.5zm.21-1H7V8h7v4h-1.5l-.5.5v.79l-1.15-1.14z"
              clipRule="evenodd"
            />
          </svg>{" "}
          <h1 className="text-xs md:text-sm">{props.comments}</h1>
        </Link>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
