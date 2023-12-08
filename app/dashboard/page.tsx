'use client'

  import { createClient } from '@/utils/supabase/client' 
  import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps' 
import SignUpUserSteps from '@/components/SignUpUserSteps'
 import Header from '@/components/Header' 
 import { cookies } from 'next/headers'
  import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import AuthButton from '@/components/AuthButton'

export default function Index() {
  const [active,setActive] = useState("All")
  const [type,setType] = useState("priority")

  const [area,setArea] = useState('All')
   let a; 
   let l = ["All","Adambakkam", "Adyar", "Alandur", "Alapakkam", "Alwarpet", "Alwarthirunagar", "Ambattur", "Aminjikarai", "Anna Nagar", "Annanur", "Arumbakkam", "Ashok Nagar", "Avadi", "Ayanavaram", "Beemannapettai", "Besant Nagar", "Basin Bridge", "Chepauk", "Chetput", "Chintadripet", "Chitlapakkam", "Choolai", "Choolaimedu", "Chrompet", "Egmore", "Ekkaduthangal", "Eranavur", "Ennore", "Foreshore Estate", "Fort St. George", "George Town", "Gopalapuram", "Government Estate", "Guindy", "Guduvancheri", "IIT Madras", "Injambakkam", "ICF", "Iyyapanthangal", "Jafferkhanpet", "Karapakkam", "Kattivakkam", "Kattupakkam", "Kazhipattur", "K.K. Nagar", "Keelkattalai", "Kattivakkam", "Kilpauk", "Kodambakkam", "Kodungaiyur", "Kolathur", "Korattur", "Korukkupet", "Kottivakkam", "Kotturpuram", "Kottur", "Kovilambakkam", "Koyambedu", "Kundrathur", "Madhavaram", "Madhavaram Milk Colony", "Madipakkam", "Madambakkam", "Maduravoyal", "Manali", "Manali New Town", "Manapakkam", "Mandaveli", "Mangadu", "Mannady", "Mathur", "Medavakkam", "Meenambakkam", "MGR Nagar", "Minjur", "Mogappair", "MKB Nagar", "Mount Road", "Moolakadai", "Moulivakkam", "Mugalivakkam", "Mudichur", "Mylapore", "Nandanam", "Nanganallur", "Nanmangalam", "Neelankarai", "Nemilichery", "Nesapakkam", "Nolambur", "Noombal", "Nungambakkam", "Otteri", "Padi", "Pakkam", "Palavakkam", "Pallavaram", "Pallikaranai", "Pammal", "Park Town", "Parry's Corner", "Pattabiram", "Pattaravakkam", "Pazhavanthangal", "Peerkankaranai", "Perambur", "Peravallur", "Perumbakkam", "Perungalathur", "Perungudi", "Pozhichalur", "Poonamallee", "Porur", "Pudupet", "Pulianthope", "Purasaiwalkam", "Puthagaram", "Puzhal", "Puzhuthivakkam/ Ullagaram", "Raj Bhavan", "Ramavaram", "Red Hills", "Royapettah", "Royapuram", "Saidapet", "Saligramam", "Santhome", "Sembakkam", "Selaiyur", "Shenoy Nagar", "Sholavaram", "Sholinganallur", "Sithalapakkam", "Sowcarpet", "St.Thomas Mount", "Surapet", "Tambaram", "Teynampet", "Tharamani", "T. Nagar", "Thirumangalam", "Thirumullaivoyal", "Thiruneermalai", "Thiruninravur", "Thiruvanmiyur", "Tiruverkadu", "Thiruvotriyur", "Thuraipakkam", "Tirusulam", "Tiruvallikeni", "Tondiarpet", "United India Colony", "Vandalur", "Vadapalani", "Valasaravakkam", "Vallalar Nagar", "Vanagaram", "Velachery", "Velappanchavadi", "Villivakkam", "Virugambakkam", "Vyasarpadi", "Washermanpet", "West Mambalam"]

   function ask(param:String){ 
    if(param=='Very Urgent'){ a='text-red-500' }
    else if(param=='Urgent'){ a='text-orange-400' } 
    else if(param=='Closed'){ a='text-green-500' } 
    else{ a='text-yellow-500' } 
     return 'inline-block px-4 py-1 bg-neutral-50 rounded-md '+a

}
const canInitSupabaseClient = () => {
  // This function is just for the interactive tutorial.
  // Feel free to remove it once you have Supabase connected.
  try {
    createClient()
    return true
  } catch (e) {
    return false
  }
}
const supabase = createClient()
const [usermail,setusermail] = useState("")

const [username,setusername] = useState("")
const [userimage,setuserimage] = useState('')


const isSupabaseConnected = canInitSupabaseClient()
if(isSupabaseConnected){
  const [posts,setPosts] = useState([])
  useEffect(()=>{
  async function setmail(){
    const {
        data: { user },
      } = await supabase.auth.getUser()
      setusermail(user.email)
      setusername(user.user_metadata.name)
      setuserimage(user.user_metadata.avatar_url)
      console.log(user)
  }
  setmail()
    async function fetch(){
    
        if(area=='All'){
      if(active=='All'){
  const {data,error} = await supabase.from('issues').select('*').eq('uid',usermail).order('id', { ascending: false })
  let a;
  if(data){
    a=data
  }
  else{
    a=[]
  }
  setPosts(a)
}
else if(active=='Active'){
  const {data,error} = await supabase.from('issues').select('*').eq('uid',usermail).order('id', { ascending: false }).neq('isopen',false)
  let a;
  if(data){
    a=data
  }
  else{
    a=[]
  }
  setPosts(a)
}
else{
  const {data,error} = await supabase.from('issues').select('*').eq('uid',usermail).eq('priority',active).order('id', { ascending: false })
  let a;
  if(data){
    a=data
  }
  else{
    a=[]
  }
  setPosts(a)
}
}
else{
  if(active=='All'){
    const {data,error} = await supabase.from('issues').select('*').eq('uid',usermail).eq('area',area).order('id', { ascending: false })
    let a;
    if(data){
      a=data
    }
    else{
      a=[]
    }
    setPosts(a)
  }
  else if(active=='Active'){
    const {data,error} = await supabase.from('issues').select('*').eq('uid',usermail).eq('area',area).order('id', { ascending: false }).neq('isopen',false)
    let a;
    if(data){
      a=data
    }
    else{
      a=[]
    }
    setPosts(a)
  }
  else{
    const {data,error} = await supabase.from('issues').select('*').eq('uid',usermail).eq('area',area).eq('priority',active).order('id', { ascending: false })
    let a;
    if(data){
      a=data
    }
    else{
      a=[]
    }
    setPosts(a)
  
  }

     
    }
   
  }
    fetch()
  },[active,area])

  return usermail ? ( 
    <div className='grid w-auto grid-cols-1 gap-0 px-5 mt-0 mb-10 sm:px-10 xl:px-72 lg:px-64'>
        <h1 className='mt-5 text-2xl font-bold text-black'>Your Complaints</h1>
        <div className="flex flex-row items-center content-center gap-5 my-3 mt-5">
            <img className="w-16 h-16 rounded-full" src={userimage}></img> 
            <div className='flex flex-col gap-1'>
            <h1 className='font-medium text-md'>{username}</h1>
            <h1 className='text-sm'>{usermail}</h1>
            </div>
        </div>
    <div className='flex flex-row w-auto gap-4 px-4 py-5 mt-4 mb-5 overflow-x-auto sm:mb-0'>
    <button onClick={()=>setActive('All')} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='All'?`text-white bg-blue-600`:`text-neutral-700 bg-white`}`}>All</button>

    <button onClick={()=>(setType('priority'),setActive('Very Urgent'))} className={`flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg ${active=='Very Urgent'?`text-white bg-blue-600`:`text-neutral-700 bg-white`}`}>Very Urgent</button>
    <button onClick={()=>(setType('priority'),setActive('Urgent'))} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='Urgent'?`text-white bg-blue-600`:`text-neutral-700 bg-white`}`}>Urgent</button>
    <button onClick={()=>(setType('priority'),setActive('Moderate'),console.log(active))} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='Moderate'?`text-white bg-blue-600`:`text-neutral-700 bg-white`}`}>Moderate</button>
    <button onClick={()=>(setType('priority'),setActive('Closed'),console.log(active))} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='Closed'?`text-white bg-blue-600`:`text-neutral-700 bg-white`}`}>Closed</button>
    <button onClick={()=>(setType('priority'),setActive('Active'),console.log(active))} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='Active'?`text-white bg-blue-600`:`text-neutral-700 bg-white`}`}>Active</button>
</div>
<div className='flex flex-row items-center content-center w-auto gap-4 px-4 mb-10'>
  <h1 className='font-medium text-md'><span className='hidden mr-1 md:inline-block'>Filter By</span>Area: </h1>
<select
          className="px-4 py-2 border rounded-md bg-inherit"
          name="area"
          placeholder="Area (Be as precise as possible)"
          required
          onChange={(e:any)=>setArea(e.target.value)}
        >
          {l.map((c) => <option key={c} value={c}>{c}</option>)} 
        </select>
</div>
   <div className='grid grid-cols-1 gap-6'>
   
    {posts?.length ? (posts.map((post: any) => (<Link href={`/complaint/${post.id}`} key={post.id}> <div className="w-full p-4 bg-white rounded-md animate-in ">
      <div className="flex flex-row items-center content-center justify-between mb-4"> <h1 className="text-lg font-bold">{post.name}</h1> <div className={ask(post.priority)}>

{post.priority}

</div>

</div>

<div className="flex flex-row items-center content-center gap-4 mb-4 font-semibold text-justify">
<p className='px-2 py-2 text-sm font-normal rounded-lg w-max bg-neutral-100'>{post.area}</p>
<p className={`px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg ${post.isverified?``:`hidden`}`}>Verified</p>

<p className='text-sm'>+91 {post.contact}</p>


</div>

<div className="mt-4">

<span

className="w-full rounded-md multiLineLabel"



>{post.concern}</span>

</div>

</div></Link>))
    ) : (
      
      <div className='w-auto animate-in'>
        <h1 className='w-full px-8 text-center multiLineLabel'>No complaints related to your query were found. Either it is an invalid query, or the requested complaint no longer exists. Please change the filters</h1>
      </div>
    )}
 
<div className="animate-in">
{isSupabaseConnected ?  <div>{}</div>:<div>An Internal Server Error Occured</div>} 
</div>
  </div></div>) : (
    <></>
  ) }}
