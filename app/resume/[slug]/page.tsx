import {cookies}  from "next/headers";
import { createClient } from "@/utils/supabase/server";
export default async function resume(){
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    let firstname,lastname,workhistory,education,id,certifications,skills,professionalSummary,age,contact;
    const {data:user} = await supabase.auth.getUser()
    const {data,error} = await supabase.from('resume').select('*').eq('id',user.user.id)
    if(!error){
        firstname = data[0]["firstname"]
        lastname = data[0]["lastname"]
        age = data[0]["age"]
        certifications = data[0]["certifications"]
        skills = data[0]["skills"]
        workhistory = data[0]["workhistory"]
        professionalSummary = data[0]["professionalSummary"]
        education = data[0]["education"]
        contact = data[0]["contact"]

    }
    else{
        console.log(error)

    }
    return(
        <div className="grid h-full grid-flow-col grid-cols-2 lg:grid-flow-row lg:grid-rows-2">
            <div className="w-full h-full">
                
            </div>
            <div className="w-full h-full bg-black">

            </div>
            
        </div>
    )
}