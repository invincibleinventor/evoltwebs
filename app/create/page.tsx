'use client'
import '@mdxeditor/editor/style.css'
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import Link from "next/link"
import { useRef, useState } from "react"
import { MDXEditor, linkPlugin, MDXEditorMethods, headingsPlugin, UndoRedo , toolbarPlugin , BoldItalicUnderlineToggles} from "@mdxeditor/editor"
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

export default function Create(){
  async function imageUploadHandler(image: File) {
    const formData = new FormData()
    formData.append('image', image)
    // send the file to your server and return 
    // the URL of the uploaded image in the response
    const response = await fetch('/uploads/new', { 
        method: 'POST', 
        body: formData 
    })
    const json = (await response.json()) as { url: string }
    return json.url
  }
  
    const supabase = createClient()
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
          
      <div className={`'flex-1 flex flex-col justify-center px-8 gap-2 overflow-y-hidden overflow-x-hidden`}>
  
       
     <form
       className="flex flex-col justify-center w-full gap-2 pt-20 pr-5 my-auto overflow-x-hidden overflow-y-hidden animate-in text-foreground"
       action={create}>
       
     
       <label className="text-md" htmlFor="content">
         Title
       </label>
       <input
        onChange={(e:any)=>setTitle(e.target.value)}
         className="w-full px-4 py-2 mb-6 mr-4 text-sm bg-white border "
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
         className="w-full px-4 py-2 mb-6 mr-4 text-sm bg-white border "
         name="content"
         placeholder="Please Type Out Your Excerpt"
         required
         maxLength={200}
         minLength={90}
       />
        <label className="text-md" htmlFor="content">
         Content
       </label>
       <div data-color-mode="light">
       <div className="wmde-markdown-var"> </div>

       <MDEditor
       className='mx-[2px] mb-6 '
        value={content}
        onChange={setContent}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      </div>
       
       <button className="px-8 py-4 mb-2 text-sm text-white bg-black rounded-lg w-max text-foreground">
         Publish This Post
       </button>
       
      
     </form>
   </div>
    )
}
