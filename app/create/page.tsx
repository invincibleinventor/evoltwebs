'use client'
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import Link from "next/link"
import { useRef, useState } from "react"
import { MDXEditor, MDXEditorMethods, headingsPlugin } from "@mdxeditor/editor"
export default function Create(){
    const supabase = createClient()
    const ref = useRef<MDXEditorMethods>(null)
        const [content,setContent] = useState('')
    const [excerpt,setExcerpt] = useState('')
    const [title,setTitle] = useState('')
    async function create(){
      const {data:{user}} = await supabase.auth.getUser()
      const {data:u} = await supabase.from('user').select('handle').eq('id',user.id)
      const{data:check} = await supabase.from('posts').select('*').eq('poster',user.id).order('id',{ascending:false}).limit(1)
let s;        
if(check && check.length>0){
  s=check[0]
}
else{
  s=[]
}
        if(s && s.excerpt==excerpt && s.title==title && s.handle==u[0]["handle"] && s.content==content){
          return redirect('/');
        }
        else{
        const {data,error} = await supabase.from('posts').insert({handle:u[0]["handle"],excerpt:excerpt,content:content,title:title})
        if(error){
            alert(error.message)
console.log(error)
        }
        else{
            redirect('/')
        }
    }
  }
    return(
          
      <div className={`'flex-1 flex flex-col justify-center h-screen px-8 gap-2 overflow-x-hidden overflow-y-hidden`}>
  
       
     <form
       className="flex flex-col justify-center flex-1 w-full gap-2 pr-5 my-auto animate-in text-foreground"
       action={create}>
       
     
       <label className="text-md" htmlFor="content">
         Title
       </label>
       <textarea
        onChange={(e:any)=>setTitle(e.target.value)}
         className="w-full px-4 py-2 mb-6 mr-4 border rounded-md bg-inherit"
         name="content"
         placeholder="Please Type Out Your Title"
         required
         maxLength={60}
         minLength={15}
       />
       <label className="text-md" htmlFor="content">
         Excerpt
       </label>
       <textarea
        onChange={(e:any)=>setExcerpt(e.target.value)}
         className="w-full px-4 py-2 mb-6 mr-4 border rounded-md bg-inherit"
         name="content"
         placeholder="Please Type Out Your Excerpt"
         required
         maxLength={200}
         minLength={90}
       />
        <label className="text-md" htmlFor="content">
         Content
       </label>
       <MDXEditor ref={ref} markdown={""
       } plugins={[headingsPlugin()]} />
       <textarea
        onChange={(e:any)=>setContent(e.target.value)}
         className="w-full px-4 py-2 mb-6 mr-4 border rounded-md h-2/6 bg-inherit"
         name="content"
         placeholder="Please Type Out Your Content"
         required
         maxLength={200000}
         minLength={100}
       />
       
       <button className="px-8 py-4 mb-2 text-white bg-red-400 rounded-full w-max text-foreground">
         Publish This Post
       </button>
       
      
     </form>
   </div>
    )
}
