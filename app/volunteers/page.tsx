'use client'

  import { createClient } from '@/utils/supabase/client' 

  import {  useEffect, useState } from 'react'
import Link from 'next/link'

export default function Index() {


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
const [text,setText] = useState('Become A Volunteer')
const isSupabaseConnected = canInitSupabaseClient()
if(isSupabaseConnected){
  const [load,setLoad] = useState(true)
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    async function fetch(){
      const {data:{user},error} = await supabase.auth.getUser()
      let email;
if(user){
  setMail(user.email)
  email = user.email
}
const {data:check} = await supabase.from('volunteer').select('uid').eq('uid',email)
if(check && check.length>0){
  console.log(check)
  setText('Edit Volunteer Profile')
}
        if(area=='All'){
  const {data,error} = await supabase.from('volunteer').select('*')
  let a;
  if(data){
    a=data
  }
  else{
    a=[]
  }
  setPosts(a);setLoad(false)


}
else{

    const {data,error} = await supabase.from('volunteer').select('*').eq('area',area)
    let a;
    if(data){
      a=data
    }
    else{
      a=[]
    }
    setPosts(a);setLoad(false)
  

     
    }
   
  }
    fetch()
  },[area])
  return (
    <div className='grid w-auto grid-cols-1 gap-0 px-5 mt-0 sm:px-10 xl:px-72 lg:px-64'>
       <div className='flex flex-row gap-4 mb-0 md:mb-0'>
     <Link
      className="flex px-5 py-2 mt-10 mb-6 text-white no-underline bg-blue-600 rounded-md md:ml-auto md:mb-0 w-max"
     href="/newvolunteer"
    >
     
      {text}
    </Link>
  
    </div>
     <div className='flex flex-col mt-0 mb-6 md:content-center md:items-center md:flex-row'>

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


</div>

   <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
   
    {posts?.length ? (posts.map((post: any) => (<Link className='px-6 py-6 bg-white rounded-md animate-in border-neutral-300'href={`/volunteer/${post.id}`} key={post.id}> 
    
        
           
      <div className='flex flex-row items-center content-center gap-6 px-4 mx-auto ml-0 w-max md:mx-0 md:ml-0 '>
<img className='w-16 h-16 rounded-full' src={post.pic}></img>
<div className='flex flex-col gap-[10px]'>
    <h1 className='text-xl font-bold'>{post.name}</h1>
    <p className='px-4 py-2 text-xs font-medium text-blue-600 bg-blue-100 rounded-md w-max border-neutral-300'>{post.area}</p>
   </div>
</div>
<div className="flex flex-col gap-2 mt-8 font-semibold text-justify">
    <div className='flex flex-col gap-2'>
<p className='mb-0 font-semibold rounded-md text-md w-max'>Services Offered</p>

<p className='w-full text-sm font-normal leading-relaxed rounded-md multiLineLabel'>{post.services}</p>
</div>
</div>
        </Link>))
    ) : (
      
      <div className='w-auto py-20 animate-in'>
        <h1 className='w-full px-8 leading-relaxed text-center multiLineLabel'>{load?'Loading':'No complaints related to your query were found. Either it is an invalid query, or the requested complaint no longer exists. Please change the filters and try. Try refreshing the page if that dosent work.'}</h1>
      </div>
    )}
 
<div className="animate-in">
{isSupabaseConnected ?  <div>{}</div>:<div>An Internal Server Error Occured</div>} 
</div>
  </div></div>) }}
