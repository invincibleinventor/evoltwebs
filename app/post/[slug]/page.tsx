'use client';
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import remarkGfm from 'remark-gfm'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Markdown from "react-markdown";
import MarkdownRenderer from 'react-markdown-renderer';
export default function App({ params }: { params: { slug: string } }) {
    const supabase = createClient()
    const [post,setPost] = useState("")
    const [author,setAuthor] = useState("")
    const [content,setContent] = useState("")
    const [title,setTitle] = useState("")
    const [name,setName] = useState("")
    const [cover,setCover] = useState("")
    const [profile,setProfile] = useState("")
    const [error,setError] = useState(false)
    const [time,setTime] = useState(0)
    const [loading,setLoading] = useState(true)

    TimeAgo.locale(en)

    const timeAgo = new TimeAgo('en-US')
    const date1 = new Date();
    useEffect(()=>{
        async function set(){
        const {data,error} = await supabase.from('posts').select('*').eq('id',params.slug)
        if(data && data.length>0){
            setError(false)
            setPost(data[0])
            const {data:u} = await supabase.from('user').select('*').eq('id',data[0]["poster"])
            setAuthor(u[0]["handle"])
            setName(u[0].name)
            setProfile(u[0].image)
            setContent(data[0]["content"])
            setTitle(data[0]["title"])
            setCover(data[0]["cover"])
            
    let date2 = new Date(data[0].created_at)
    setTime(date1.getTime()-date2.getTime())
            setLoading(false)
        }
        else if (error || data.length==0){
            setError(true)
            setLoading(false)
          }  }
    
set()    }
)
function ClickableImage(props) {
    
    return <img {...props} className="w-full max-w-full"/>
  }
const components = {
    img: ClickableImage
  }
    return !loading ? (
        <div className="flex flex-col flex-1 h-screen overflow-x-hidden overflow-y-hidden">
        {error &&
            <div className="flex items-center content-center w-full h-screen px-10 lg:px-24 sm:px-24 md:px-16">
            <div className="flex flex-col gap-2 mx-auto max-w-max">
            <h1 className="mx-auto text-lg font-semibold text-center text-black">That Content Doesn't Exist</h1>
            <h1 className="mx-auto text-sm text-center text-neutral-400">That page does not exist. It must have been moved or deleted. Please refresh if you think that is not the case</h1>
            <Link href="/" className={`w-max mx-auto text-xs font-bold mt-3 px-8 py-3 ${(1==1)?'bg-black text-white':'bg-white  border-2 '}`}>Return Back</Link>
      
            </div>
            
          </div>
        }
        {!error &&
        <div className="w-[calc(100vw-68px)] overflow-hidden md:max-w-full md:w-full hiddenscroll">
        <div className="relative w-full h-64" >
                <img src={cover?cover:'https://picsum.photos/2000/3000'} className="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-64"></img>
               
            </div>
            <div className="flex flex-col flex-1 w-full max-w-full px-8 py-8 ">
              <h1 className="text-3xl font-extrabold md:leading-[calc(15*4px)] md:text-5xl">{title}</h1>
              <div className="flex flex-row items-center content-center justify-between mt-6 text-md">
                <Link  href={"/profile/"+author} className="flex flex-row items-center content-center">
                <img className="mr-3  w-6 h-6" src={profile}></img>
                <h1 className="font-semibold">{name}</h1>
                </Link>
                <h1 className="text-sm font-normal">Posted {timeAgo.format(Date.now() - time)}</h1>
              </div>
            <Markdown remarkPlugins={[remarkGfm]} components={components}  className="mt-12 prose font-inter">{content}</Markdown>
           </div> </div>
        }
            </div>
    )
        :(<div className="flex items-center content-center w-full h-screen">
        <Oval
          height={80}
          width={80}
          color="#dc2626"
          wrapperStyle={{}}
          wrapperClass="mx-auto"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#f87171"
          strokeWidth={2}
          strokeWidthSecondary={2}
          
          />
       </div>
    )
}
