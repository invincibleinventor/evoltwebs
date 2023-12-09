'use client'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
export default function Create() {
  const supabase = createClient()
  const router = useRouter()
  const [email,setEmail] = useState('')
  const [pic,setPic] = useState('')
  const [uname,setUname] = useState('')
  const [volunteer,isVolunteer] = useState(false)
let disabled = false;
const[buttontext,setButtontext] = useState('Become A Volunteer')
let l = ["Adambakkam", "Adyar", "Alandur", "Alapakkam", "Alwarpet", "Alwarthirunagar", "Ambattur", "Aminjikarai", "Anna Nagar", "Annanur", "Arumbakkam", "Ashok Nagar", "Avadi", "Ayanavaram", "Beemannapettai", "Besant Nagar", "Basin Bridge", "Chepauk", "Chetput", "Chintadripet", "Chitlapakkam", "Choolai", "Choolaimedu", "Chrompet", "Egmore", "Ekkaduthangal", "Eranavur", "Ennore", "Foreshore Estate", "Fort St. George", "George Town", "Gopalapuram", "Government Estate", "Guindy", "Guduvancheri", "IIT Madras", "Injambakkam", "ICF", "Iyyapanthangal", "Jafferkhanpet", "Karapakkam", "Kattivakkam", "Kattupakkam", "Kazhipattur", "K.K. Nagar", "Keelkattalai", "Kattivakkam", "Kilpauk", "Kodambakkam", "Kodungaiyur", "Kolathur", "Korattur", "Korukkupet", "Kottivakkam", "Kotturpuram", "Kottur", "Kovilambakkam", "Koyambedu", "Kundrathur", "Madhavaram", "Madhavaram Milk Colony", "Madipakkam", "Madambakkam", "Maduravoyal", "Manali", "Manali New Town", "Manapakkam", "Mandaveli", "Mangadu", "Mannady", "Mathur", "Medavakkam", "Meenambakkam", "MGR Nagar", "Minjur", "Mogappair", "MKB Nagar", "Mount Road", "Moolakadai", "Moulivakkam", "Mugalivakkam", "Mudichur", "Mylapore", "Nandanam", "Nanganallur", "Nanmangalam", "Neelankarai", "Nemilichery", "Nesapakkam", "Nolambur", "Noombal", "Nungambakkam", "Otteri", "Padi", "Pakkam", "Palavakkam", "Pallavaram", "Pallikaranai", "Pammal", "Park Town", "Parry's Corner", "Pattabiram", "Pattaravakkam", "Pazhavanthangal", "Peerkankaranai", "Perambur", "Peravallur", "Perumbakkam", "Perungalathur", "Perungudi", "Pozhichalur", "Poonamallee", "Porur", "Pudupet", "Pulianthope", "Purasaiwalkam", "Puthagaram", "Puzhal", "Puzhuthivakkam/ Ullagaram", "Raj Bhavan", "Ramavaram", "Red Hills", "Royapettah", "Royapuram", "Saidapet", "Saligramam", "Santhome", "Sembakkam", "Selaiyur", "Shenoy Nagar", "Sholavaram", "Sholinganallur", "Sithalapakkam", "Sowcarpet", "St.Thomas Mount", "Surapet", "Tambaram", "Teynampet", "Tharamani", "T. Nagar", "Thirumangalam", "Thirumullaivoyal", "Thiruneermalai", "Thiruninravur", "Thiruvanmiyur", "Tiruverkadu", "Thiruvotriyur", "Thuraipakkam", "Tirusulam", "Tiruvallikeni", "Tondiarpet", "United India Colony", "Vandalur", "Vadapalani", "Valasaravakkam", "Vallalar Nagar", "Vanagaram", "Velachery", "Velappanchavadi", "Villivakkam", "Virugambakkam", "Vyasarpadi", "Washermanpet", "West Mambalam"]
useEffect(()=>{
  async function fetch(){
const {
    data: { user },
  } = await supabase.auth.getUser()
  if(user)setEmail(user.email)
  setPic(user.user_metadata.avatar_url)
setUname(user.user_metadata.name)
}
fetch()

async function get(){

  const {data} = await supabase.from('volunteer').select('*').eq('uid',email)
  if(data && data.length>0){
    isVolunteer(true)
    dsetName(data[0].name)
    dsetArea(data[0].area)
    dsetContact(data[0].contact)
    dsetContact2(data[0].contact2)
    dsetDescription(data[0].description)
    dsetTime(data[0].time)
    dsetServices(data[0].services)
    setButtontext('Save Your Changes')
  }
}
get()

})
const [name,setName] = useState('')
const [dname,dsetName] = useState('')

const [area,setArea] = useState('Adambakkam')
const [darea,dsetArea] = useState('Adambakkam')

const [contact,setContact] = useState(0)
const [dcontact,dsetContact] = useState('')
const [contact2,setContact2] = useState(0)
const [dcontact2,dsetContact2] = useState('')
const [description,setDescription] = useState('')
const [ddescription,dsetDescription] = useState('')
const [time,setTime] = useState('')
const [dtime,dsetTime] = useState('')
const [services,setServices] = useState('')
const [dservices,dsetServices] = useState('')

  
  /*<h1 className='mt-5 ml-4 text-2xl font-bold text-black'>Your Complaints</h1>
        <div className="flex flex-row items-center content-center gap-5 my-3 mt-5 ml-4">
            <img className="w-16 h-16 rounded-full" src={userimage}></img> 
            <div className='flex flex-col gap-1'>
            <h1 className='font-medium text-md'>{username}</h1>
            <h1 className='text-sm'>{usermail}</h1>
            </div>
        </div>
      */
   
 
    
  async function push(event){
    let n;let s;let a; let t; let d ; let c1; let c2

if(name==''){setName(dname);n=dname}else{n=name}
if(area==''){setArea(darea);a=darea}else{a=area}
if(services==''){setServices(dservices);s=dservices}else{s=services}
if(time==''){setTime(dtime);t=dtime}else{t=time}
if(description==''){setDescription(ddescription);d=ddescription}else{d=description}
if(contact==0){setContact(parseInt(dcontact));c1=dcontact}else{c1=contact}
if(contact2==0){setContact2(parseInt(dcontact2));c2=dcontact2}else{c2=contact2}





event.preventDefault();
     console.log(name)
     if(isVolunteer){
  const {data,error } = await supabase.from('volunteer').update({uname:uname,pic:pic,uid:email,name:n,area:a,contact:c1,contact2:c2,description:d,services:s,time:t}).eq('uid',email)
     
if(error){
console.log(error)
}
else{

    router.push('/?message=Successfully listed as volunteer')

  
  }
    }else{
      const {data,error } = await supabase.from('volunteer').insert({uname:uname,pic:pic,uid:email,name:name,area:area,contact:contact,contact2:contact2,description:description,services:services,time:time})
     
      if(error){
      console.log(error)
      }
      else{
      
          router.push('/?message=Successfully listed as volunteer')
      
        
        }
    }}


  return email ?  (
   
        
    
     
     <div className={`flex flex-col justify-center flex-1 w-screen gap-2 px-8 mt-10 mb-20 sm:max-w-3xl ${disabled?'hidden':''}`}>
  
      <Link
        href="/"
        className="flex items-center px-4 py-2 mb-5 text-sm no-underline rounded-md w-max left-8 top-24 text-foreground bg-neutral-200 hover:bg-neutral-300 z-1000 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <form
        className="flex flex-col justify-center flex-1 w-auto gap-2 my-auto animate-in text-foreground"
        onSubmit={(e:any)=>push(e)}>
        
        <label className="text-md" htmlFor="name">
          Your Name
        </label>
        <input
          className="w-full px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="name"
          placeholder="Your Full Name"
          required
          
          defaultValue={dname}
          onChange={(e:any)=>(setName(e.target.value),console.log(name))}
          maxLength={60}
        />
          <label className="text-md" htmlFor="area">
          Where are you from? (Choose 'Other' if your area is not specified in the list)
        </label>
        <select
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="area"
          placeholder="Area (Be as precise as possible)"
          onChange={(e:any)=>setArea(e.target.value)}
          defaultValue={darea}
          required
        >
          {l.map((c) => <option key={c} value={c}>{c}</option>)} 
        </select>
          <label className="text-md" htmlFor="contact">
          Primary Contact Number
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="contact"
          type="number"
          defaultValue={dcontact}
          maxLength={10}
          placeholder="Phone Number"
          onChange={(e:any)=>setContact(parseInt(e.target.value))}

          required
        />
         <label className="text-md" htmlFor="contact2">
          (Optional) Secondary Contact Number
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="contact2"
          type="number"
          maxLength={10}
          defaultValue={dcontact2}
          onChange={(e:any)=>setContact2(parseInt(e.target.value))}

          placeholder="Phone Number"
        />
        <label className="text-md" htmlFor="description">
          Write few words about yourself
        </label>
        <textarea
          className="h-full px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="description"
          defaultValue={ddescription}
          placeholder="Write a short gist about yourself"
          required
          minLength={30}
          onChange={(e:any)=>setDescription(e.target.value)}

          maxLength={1000}
        />
         <label className="text-md" htmlFor="services">
          Services You Offer
        </label>
        <textarea
          className="px-4 py-2 mb-6 border rounded-md h-max bg-inherit"
          name="services"
          placeholder="Mention the services that you can offer to help people. Example - Food Distribution"
          required
          defaultValue={dservices}
          minLength={10}
          onChange={(e:any)=>setServices(e.target.value)}

          maxLength={1000}
        />
        <label className="text-md" htmlFor="time">
          Available Timings
        </label>
        <textarea
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="time"
          defaultValue={dtime}
          placeholder="Mention the timings at which people can contact you for help. Example - 9 AM - 10 PM"
          required
          minLength={8}
          onChange={(e:any)=>setTime(e.target.value)}

          maxLength={1000}
        />
         
     
        <button type="submit" className="px-4 py-2 mb-2 text-white bg-green-700 rounded-md text-foreground">
          {buttontext}
        </button>
        
       
      </form>
    </div>
   
  ) : (<div className='py-20'>Login To Become A Volunteer</div>)
}
