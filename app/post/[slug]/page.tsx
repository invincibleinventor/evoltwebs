import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import remarkGfm from 'remark-gfm'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Markdown from "react-markdown";
import { cookies } from "next/headers";
import CommentComponent from "@/components/CommentComponent";
export default async function App({ params }: { params: { slug: string } }) {
  let cookieStore = cookies()
    let supabase = createClient(cookieStore)
    let post = ""
    let author = ""
    let content = ""
    let title = ""
    let name = ""
    let cover = ""
    let profile = ""
    let error = false
    let time = 0
    let loading = false
    let myname = ""
    let myphoto = ""
    let loggedin = false
    TimeAgo.locale(en)

    const timeAgo = new TimeAgo('en-US')
    const date1 = new Date();
  
        async function set(){
          const {data:u} = await supabase.auth.getSession()
          let user = u.session.user.id
          if(u){
            loggedin = true
          const {data:users} = await supabase.from('user').select('*').eq('id',user)
          myphoto =  users[0]["image"]
            myname = users[0]["name"]
          }        
        const {data,error:e} = await supabase.from('posts').select('*').eq('id',params.slug)
        if(data && data.length>0){
            error = false
            post = data[0]
            const {data:u} = await supabase.from('user').select('*').eq('id',data[0]["poster"])
            author  = u[0]["handle"]
            name = u[0].name
            profile = u[0].image
            content = data[0]["content"]
            title = data[0]["title"]
            cover = data[0]["cover"]
            
    let date2 = new Date(data[0].created_at)
    time = date1.getTime()-date2.getTime()
            loading = false
        }
        else if (e || data.length==0){
            error = true
            loading = false
          }  }
    
await set()    
function ClickableImage(props) {
    
    return <img {...props} className="w-full max-w-full"/>
  }
const components = {
    img: ClickableImage
  }
    return !loading ? (
        <div className="relative flex flex-col flex-1 h-screen overflow-x-hidden overflow-y-hidden">
        {error &&
            <div className="flex items-center content-center w-full h-screen px-10 lg:px-24 sm:px-24 md:px-16">
            <div className="flex flex-col gap-2 mx-auto max-w-max">
            <h1 className="mx-auto text-lg font-semibold text-center text-black">That Post Doesn't Exist</h1>
            <h1 className="mx-auto text-sm text-center text-neutral-400">That post does not exist. It must have been removed or deleted by the author. Please refresh if you think that is not the case</h1>
            <Link href="/" className={`w-max mx-auto text-xs font-bold mt-3 px-8 py-3 ${(1==1)?'bg-black text-white':'bg-white  border-2 '}`}>Return Back</Link>
      
            </div>
            
          </div>
        }
        {!error &&
        <div className="w-[calc(100vw-68px)] md:border-x md:border-x-gray-150 h-full pb-14 overflow-hidden md:max-w-full md:w-full hiddenscroll">
        <div className="relative w-full h-64" >
                <img src={cover?cover:'https://picsum.photos/2000/3000'} className="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-64"></img>
               
            </div>
            <div className="flex flex-col flex-1 w-full max-w-full px-8 py-8 ">
              <h1 className="text-3xl font-extrabold md:leading-[calc(13*4px)] md:text-4xl fix-overflow">{title}</h1>
              <div className="flex flex-row items-center content-center justify-between mt-6 text-md">
                <Link  href={"/profile/"+author} className="flex flex-row items-center content-center">
                <img className="w-6 h-6 mr-3" src={profile}></img>
                <h1 className="font-medium">{name}</h1>
                </Link>
                <h1 className="text-sm font-normal">Posted {timeAgo.format(Date.now() - time)}</h1>
              </div>
            <Markdown remarkPlugins={[remarkGfm]} components={components}  className="mt-12 prose font-inter fix-overflow">{content}</Markdown>
           </div>
  <section className="px-8 pt-0 pb-8" id="comments">
    <h1 className="mb-2 text-xl font-bold">Comments</h1>
    {loggedin &&
    <div className="flex flex-row px-2 mt-4 mb-3 space-x-4">
      <img src={myphoto} className="w-8 h-8 shrink-0"/>
      <textarea className="w-full px-4 py-2 border outline-none focus:border-gray-700" placeholder={"Post comment publicly as "+myname}>
        
      </textarea>
    </div>
}
    <div className="flex flex-col px-2 my-3 mt-6 space-y-4">
    <CommentComponent handle="abishek.vh" likes={69} liked={true} name="Yuichi" profile="/bg.jpg" content="Hello World"/>
    <CommentComponent handle="abishek.vh" likes={420} liked={false} name="Yuichi" profile="/bg.jpg" content="Hello World"/>
    <CommentComponent handle="abishek.vh" likes={540} liked={true} name="Yuichi" profile="/bg.jpg" content="Hello World"/>
  </div>
  </section>
            </div>
  
       }
           <div className="absolute bottom-0 flex flex-row w-full bg-white border-t border-x border-x-150 h-14 border-t-gray-150">
           <Link href="#comments" className="flex flex-row items-center content-center px-6 ml-auto space-x-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="m4 11.29l1-1v1.42l-1.15 1.14L3 12.5V10H1.5L1 9.5v-8l.5-.5h12l.5.5V6h-1V2H2v7h1.5l.5.5zM10.29 13l1.86 1.85l.85-.35V13h1.5l.5-.5v-5l-.5-.5h-8l-.5.5v5l.5.5zm.21-1H7V8h7v4h-1.5l-.5.5v.79l-1.15-1.14z" clip-rule="evenodd"/></svg>          <h1 className="text-sm">Comments</h1>
          </Link>
           </div>
          
            </div>
            
    )
        :(<div className="flex items-center content-center w-full h-screen">
       
       </div>
    )
}
