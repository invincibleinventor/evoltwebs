'use client';

import { createClient } from "@/utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import CommentComponent from "./CommentComponent";
import { Oval } from "react-loader-spinner";
import { useInView } from "react-intersection-observer";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
export default function CommentsComponent(props){
    const supabase = createClient()
    TimeAgo.locale(en)
    const timeAgo = new TimeAgo('en-US')
    const date1 = new Date();
    const [loading,setLoading] = useState(true)
    const [comments,setComments] = useState([])
    const [offset, setOffset] = useState(1)
    const { ref, inView } = useInView();
    const [halt,setHalt] = useState(false)
    const [text,setText] = useState('')
    const inputRef = useRef(null);
    let PAGE_COUNT = 5
    async function get(from,to){
       
      //alert('reached')
        const {data,error} = await supabase.from('comments').select('*').eq('id',props.slug).order('likes',{ascending:false}).range(from,to)
        if(error){
            console.log(error)
          }
          else{
            if(data && data.length>0){
            console.log(data)
           let l = data
           for await (const [index,comment] of l.entries()) {
             
            console.log(index,comment)
            const {data,error} = await supabase.from('user').select('*').eq('id',comment.poster)
            if(data){
              l[index].name = data[0]["name"]
              l[index].profile = data[0]["image"]
              let date2 = new Date(l[index].time)
          l[index].newtime = date1.getTime()-date2.getTime()
              if(props.loggedin){
              if(l[index].liked.includes(props.myhandle)){
                console.log(props.myhandle,index)
                l[index].likedbyme = true
              }
              else{
                l[index].likedbyme = false
              }
            }
            else{
              l[index].likedbyme = false
            }
              console.log(l[index])
            } else{        l.splice(index,1)
          }
          
         
          }
           setComments([...comments,...l])
           setLoading(false)
           if (l.length < PAGE_COUNT) {
              setHalt(true)
            }
          }
              else{
                  setHalt(true)
              }
         
          }
        
  }
useEffect(()=>{
    if(!halt && inView){
        setOffset((prev) => prev + 1)
        
    

    const from = offset * PAGE_COUNT 
    const to = from + PAGE_COUNT - 1
    
    get(from,to)}},[inView])
    return(
        <>
      
    <div className="flex flex-col px-1 my-3 mt-6 space-y-4">
   {!loading  ? (comments.map((comment) => (
    <CommentComponent time={timeAgo.format(Date.now() - comment.newtime)} myhandle={props.myhandle} likedbypeople={comment.liked} comment_id={comment.comment_id} key={comment.comment_id} handle="abishek.vh" likes={comment.likes} likedbyme={comment.likedbyme} name={comment.name} profile={comment.profile} content={comment.content} loggedin={props.loggedin}/>
 
    ))) 
:
<>
<Oval
   height={40}
   width={40}
   color="#000000"
   wrapperStyle={{}}
   wrapperClass="mx-auto mt-5"
   visible={!halt?true:false}
   ariaLabel='oval-loading'
   secondaryColor="#808080"
   strokeWidth={2}
   strokeWidthSecondary={2}
   
   />
   <div className={!halt?'':'hidden'} ref={ref}></div>
   </>
}
    </div>
    </>
    )
}