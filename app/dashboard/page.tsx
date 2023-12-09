'use client'

  import { createClient } from '@/utils/supabase/client' 

  import {  useEffect, useState } from 'react'
import Link from 'next/link'

export default function Index() {
  const [active,setActive] = useState("All")
  const [type,setType] = useState("priority")
  const [load,setLoad] = useState(true)
  const [area,setArea] = useState('All')
   let a; 
   let l = ["All","Adambakkam", "Adyar", "Alandur", "Alapakkam", "Alwarpet", "Alwarthirunagar", "Ambattur", "Aminjikarai", "Anna Nagar", "Annanur", "Arumbakkam", "Ashok Nagar", "Avadi", "Ayanavaram", "Beemannapettai", "Besant Nagar", "Basin Bridge", "Chepauk", "Chetput", "Chintadripet", "Chitlapakkam", "Choolai", "Choolaimedu", "Chrompet", "Egmore", "Ekkaduthangal", "Eranavur", "Ennore", "Foreshore Estate", "Fort St. George", "George Town", "Gopalapuram", "Government Estate", "Guindy", "Guduvancheri", "IIT Madras", "Injambakkam", "ICF", "Iyyapanthangal", "Jafferkhanpet", "Karapakkam", "Kattivakkam", "Kattupakkam", "Kazhipattur", "K.K. Nagar", "Keelkattalai", "Kattivakkam", "Kilpauk", "Kodambakkam", "Kodungaiyur", "Kolathur", "Korattur", "Korukkupet", "Kottivakkam", "Kotturpuram", "Kottur", "Kovilambakkam", "Koyambedu", "Kundrathur", "Madhavaram", "Madhavaram Milk Colony", "Madipakkam", "Madambakkam", "Maduravoyal", "Manali", "Manali New Town", "Manapakkam", "Mandaveli", "Mangadu", "Mannady", "Mathur", "Medavakkam", "Meenambakkam", "MGR Nagar", "Minjur", "Mogappair", "MKB Nagar", "Mount Road", "Moolakadai", "Moulivakkam", "Mugalivakkam", "Mudichur", "Mylapore", "Nandanam", "Nanganallur", "Nanmangalam", "Neelankarai", "Nemilichery", "Nesapakkam", "Nolambur", "Noombal", "Nungambakkam", "Otteri", "Padi", "Pakkam", "Palavakkam", "Pallavaram", "Pallikaranai", "Pammal", "Park Town", "Parry's Corner", "Pattabiram", "Pattaravakkam", "Pazhavanthangal", "Peerkankaranai", "Perambur", "Peravallur", "Perumbakkam", "Perungalathur", "Perungudi", "Pozhichalur", "Poonamallee", "Porur", "Pudupet", "Pulianthope", "Purasaiwalkam", "Puthagaram", "Puzhal", "Puzhuthivakkam/ Ullagaram", "Raj Bhavan", "Ramavaram", "Red Hills", "Royapettah", "Royapuram", "Saidapet", "Saligramam", "Santhome", "Sembakkam", "Selaiyur", "Shenoy Nagar", "Sholavaram", "Sholinganallur", "Sithalapakkam", "Sowcarpet", "St.Thomas Mount", "Surapet", "Tambaram", "Teynampet", "Tharamani", "T. Nagar", "Thirumangalam", "Thirumullaivoyal", "Thiruneermalai", "Thiruninravur", "Thiruvanmiyur", "Tiruverkadu", "Thiruvotriyur", "Thuraipakkam", "Tirusulam", "Tiruvallikeni", "Tondiarpet", "United India Colony", "Vandalur", "Vadapalani", "Valasaravakkam", "Vallalar Nagar", "Vanagaram", "Velachery", "Velappanchavadi", "Villivakkam", "Virugambakkam", "Vyasarpadi", "Washermanpet", "West Mambalam"]

   function ask(param:String){ 
    if(param=='Very Urgent'){ a='bg-red-100 text-red-600' }
    else if(param=='Urgent'){ a='bg-orange-100 text-orange-500' } 
    else if(param=='Closed'){ a='bg-green-100 text-green-600' } 
    else{ a='text-yellow-500' } 
     return 'inline-block px-4 py-1 ml-4 rounded-md '+a

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
const [mail,setMail] = useState('')
const [username,setName] = useState('')
const [userimage,setUserImage] = useState('')
const isSupabaseConnected = canInitSupabaseClient()
if(isSupabaseConnected){
  const [posts,setPosts] = useState([])
  useEffect(()=>{
  
    async function fetch(){
    const {data:{user}} = await supabase.auth.getUser()
    setMail(user.email)
    setName(user.user_metadata.name)
    setUserImage(user.user_metadata.avatar_url)
  let mail = user.email
    if(mail){
      console.log(mail)
        if(area=='All'){
      if(active=='All'){
  const {data,error} = await supabase.from('issues').select('*').eq('uid',mail).order('id', { ascending: false })
  let a;
  if(data){
    a=data
  }
  else{
    a=[]
  }
  setPosts(a)
  setLoad(false)

}
else if(active=='Active'){
  const {data,error} = await supabase.from('issues').select('*').eq('uid',mail).order('id', { ascending: false }).neq('isopen',false)
  let a;
  if(data){
    a=data
  }
  else{
    a=[]
  }
  setPosts(a)
  setLoad(false)

}
else{
  const {data,error} = await supabase.from('issues').select('*').eq('uid',mail).eq('priority',active).order('id', { ascending: false })
  let a;
  if(data){
    a=data
  }
  else{
    a=[]
  }
  setPosts(a);    setLoad(false)

}
}
else{
  if(active=='All'){
    const {data,error} = await supabase.from('issues').select('*').eq('uid',mail).eq('area',area).order('id', { ascending: false })
    let a;
    if(data){
      a=data
    }
    else{
      a=[]
    }
    setPosts(a);    setLoad(false)
  }
  else if(active=='Active'){
    const {data,error} = await supabase.from('issues').select('*').eq('uid',mail).eq('area',area).order('id', { ascending: false }).neq('isopen',false)
    let a;
    if(data){
      a=data
    }
    else{
      a=[]
    }
    setPosts(a);    setLoad(false)
  }
  else{
    const {data,error} = await supabase.from('issues').select('*').eq('uid',mail).eq('area',area).eq('priority',active).order('id', { ascending: false })
    let a;
    if(data){
      a=data
    }
    else{
      a=[]
    }
    setPosts(a);    setLoad(false)
  
  }

     
    }
   
  }}
    fetch()
  },[active,area])
  return mail ? ( 
    <div className='grid w-auto grid-cols-1 gap-0 px-5 py-5 mt-0 mb-10 sm:px-10 xl:px-72 lg:px-64'>
        <div className="flex flex-row items-center content-center gap-5 my-3 mt-5 ml-4">
            <img className="w-16 h-16 rounded-full" src={userimage}></img> 
            <div className='flex flex-col gap-1'>
            <h1 className='font-medium text-md'>{username}</h1>
            <h1 className='text-sm'>{mail}</h1>
            </div>
        </div>
        <div className='flex flex-col mt-4 md:content-center md:items-center md:flex-row'>

        <div className='flex flex-row items-center content-center w-auto gap-4 px-1'>
  <h1 className='font-medium text-md'>Location: </h1>
<select
          className="w-3/6 px-4 py-2 text-sm border rounded-md sm:max-w-max bg-inherit"
          name="area"
          placeholder="Area"
          required
          onChange={(e:any)=>setArea(e.target.value)}
        >
          {l.map((c) => <option key={c} value={c}>{c}</option>)} 
        </select>
</div>

    <div className='flex flex-row w-auto gap-4 px-0 py-5 mt-0 mb-0 overflow-x-auto hiddenscroll'>
    <button onClick={()=>setActive('All')} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='All'?`text-white bg-blue-600`:`text-neutral-700 bg-white`}`}>All</button>

    <button onClick={()=>(setType('priority'),setActive('Very Urgent'))} className={`flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg ${active=='Very Urgent'?`text-blue-600 bg-blue-100`:`text-neutral-700 bg-white`}`}>Very Urgent</button>
    <button onClick={()=>(setType('priority'),setActive('Urgent'))} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='Urgent'?`text-blue-600 bg-blue-100`:`text-neutral-700 bg-white`}`}>Urgent</button>
    <button onClick={()=>(setType('priority'),setActive('Moderate'),console.log(active))} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='Moderate'?`text-blue-600 bg-blue-100`:`text-neutral-700 bg-white`}`}>Moderate</button>
    <button onClick={()=>(setType('priority'),setActive('Closed'),console.log(active))} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='Closed'?`text-blue-600 bg-blue-100`:`text-neutral-700 bg-white`}`}>Closed</button>
    <button onClick={()=>(setType('priority'),setActive('Active'),console.log(active))} className={`px-3 py-2 text-sm font-medium rounded-lg ${active=='Active'?`text-blue-600 bg-blue-100`:`text-neutral-700 bg-white`}`}>Active</button>
</div>
</div>

   <div className='grid grid-cols-1 gap-6'>
   
    {posts?.length ? (posts.map((post: any) => (<Link href={`/complaint/${post.id}`} key={post.id}> <div className="w-full p-4 bg-white rounded-md animate-in ">
    <div className="flex flex-row items-center content-center justify-between mb-4"> <h1 className="text-lg font-semibold">{post.name}</h1> <div className={ask(post.priority)}>

{post.priority}

</div>

</div>

<div className="flex flex-row items-center content-center gap-4 mb-4 font-semibold text-justify">
<p className='px-4 py-2 font-medium text-blue-600 bg-blue-100 rounded-md text-md w-max border-neutral-300'>{post.area}</p>
<p className={`px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-md ${post.isverified?``:`hidden`}`}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18Zm-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774l.701-.84Z" clip-rule="evenodd"/></svg></p>


</div>

<div className="mt-4">

<span

className="w-full rounded-md multiLineLabel"



>{post.concern}</span>

</div>

</div></Link>))
    ) : (
      
      <div className='w-auto py-20 animate-in'>
        <h1 className='w-full px-8 leading-relaxed text-center multiLineLabel'>{load?'Loading':'No complaints related to your query were found. Either it is an invalid query, or the requested complaint no longer exists. Please change the filters and try. Try refreshing the page if that dosent work.'}</h1>
      </div>
    )}
 
<div className="animate-in">
{isSupabaseConnected ?  <div>{}</div>:<div>An Internal Server Error Occured</div>} 
</div>
  </div></div>) : (<></>)}}
