import { cookies } from "next/headers";
import Toggle from "./components/resumetoggle";
import { createClient } from "@/utils/supabase/server";
let isresume = false;

export default async function page(){
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    async function fetchdata(){
        const {data:user} = await supabase.auth.getUser()
        if(user.user){
        const {data} = await supabase.from('user').select('*').eq('id',user.user.id)
        if(data){
            if(data[0]["isresume"]==true){
                console.log(data[0])
                
                isresume=true
          
            }
            else{
                isresume=false
            }
        }
    }
}
await fetchdata()
    return(
        <div>
            <div className="flex flex-row items-start content-center w-full px-4 md:mr-[calc(46.5*4px)]  h-[calc(100vh-104px)]">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-xl font-semibold text-black">
                       {!isresume? "Resume Setup":"Edit Resume"}
                    </h1>
                    <h1 className="pb-3 text-sm font-normal text-black">
                       {!isresume? "Your resume is not setup yet. Your resume showcases a breif overview of yourself to other people on Evolt.":"Your resume has been successfully setup at Evolt. You can edit it anytime. It is publicly visible to all users until you remove it."}  
                    </h1>
                    <Toggle isresume={isresume}></Toggle>
                </div>
            </div>
        </div>
    )
}