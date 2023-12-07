import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
export default async function Create() {
    
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
let l = ["Adambakkam", "Adyar", "Alandur", "Alapakkam", "Alwarpet", "Alwarthirunagar", "Ambattur", "Aminjikarai", "Anna Nagar", "Annanur", "Arumbakkam", "Ashok Nagar", "Avadi", "Ayanavaram", "Beemannapettai", "Besant Nagar", "Basin Bridge", "Chepauk", "Chetput", "Chintadripet", "Chitlapakkam", "Choolai", "Choolaimedu", "Chrompet", "Egmore", "Ekkaduthangal", "Eranavur", "Ennore", "Foreshore Estate", "Fort St. George", "George Town", "Gopalapuram", "Government Estate", "Guindy", "Guduvancheri", "IIT Madras", "Injambakkam", "ICF", "Iyyapanthangal", "Jafferkhanpet", "Karapakkam", "Kattivakkam", "Kattupakkam", "Kazhipattur", "K.K. Nagar", "Keelkattalai", "Kattivakkam", "Kilpauk", "Kodambakkam", "Kodungaiyur", "Kolathur", "Korattur", "Korukkupet", "Kottivakkam", "Kotturpuram", "Kottur", "Kovilambakkam", "Koyambedu", "Kundrathur", "Madhavaram", "Madhavaram Milk Colony", "Madipakkam", "Madambakkam", "Maduravoyal", "Manali", "Manali New Town", "Manapakkam", "Mandaveli", "Mangadu", "Mannady", "Mathur", "Medavakkam", "Meenambakkam", "MGR Nagar", "Minjur", "Mogappair", "MKB Nagar", "Mount Road", "Moolakadai", "Moulivakkam", "Mugalivakkam", "Mudichur", "Mylapore", "Nandanam", "Nanganallur", "Nanmangalam", "Neelankarai", "Nemilichery", "Nesapakkam", "Nolambur", "Noombal", "Nungambakkam", "Otteri", "Padi", "Pakkam", "Palavakkam", "Pallavaram", "Pallikaranai", "Pammal", "Park Town", "Parry's Corner", "Pattabiram", "Pattaravakkam", "Pazhavanthangal", "Peerkankaranai", "Perambur", "Peravallur", "Perumbakkam", "Perungalathur", "Perungudi", "Pozhichalur", "Poonamallee", "Porur", "Pudupet", "Pulianthope", "Purasaiwalkam", "Puthagaram", "Puzhal", "Puzhuthivakkam/ Ullagaram", "Raj Bhavan", "Ramavaram", "Red Hills", "Royapettah", "Royapuram", "Saidapet", "Saligramam", "Santhome", "Sembakkam", "Selaiyur", "Shenoy Nagar", "Sholavaram", "Sholinganallur", "Sithalapakkam", "Sowcarpet", "St.Thomas Mount", "Surapet", "Tambaram", "Teynampet", "Tharamani", "T. Nagar", "Thirumangalam", "Thirumullaivoyal", "Thiruneermalai", "Thiruninravur", "Thiruvanmiyur", "Tiruverkadu", "Thiruvotriyur", "Thuraipakkam", "Tirusulam", "Tiruvallikeni", "Tondiarpet", "United India Colony", "Vandalur", "Vadapalani", "Valasaravakkam", "Vallalar Nagar", "Vanagaram", "Velachery", "Velappanchavadi", "Villivakkam", "Virugambakkam", "Vyasarpadi", "Washermanpet", "West Mambalam"]
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const create = async (formData: FormData) => {
    "use server";
    
    const name = formData.get('name') as string
    const area = formData.get('area') as string
    const contact = formData.get('contact') as string
    const concern = formData.get('concern') as string
    const priority = formData.get('priority') as string
    const email = user.email
    const creates = async () => {  const cookieStore = cookies()
'use client'
        const supabase = createClient(cookieStore)

        
  const {data,error } = await supabase.from('issues').insert({uid:email,name:name,area:area,contact:contact,concern:concern,priority:priority})
if(error){
return redirect('/create?message='+error.message)
}
    return redirect('/?message=Successfully Posted Your Complaint')
  }

await creates()
}
  return user ? (
   
        
    

     
     <div className="flex flex-col justify-center flex-1 w-full gap-2 mt-20 px-8 sm:max-w-md">
      <Link
        href="/"
        className="absolute flex items-center px-4 py-2 text-sm no-underline rounded-md left-8 top-24 text-foreground bg-btn-background hover:bg-btn-background-hover group"
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
        className="flex flex-col justify-center flex-1 w-full gap-2 my-auto animate-in text-foreground"
        action={create}
      >
        
        <label className="text-md" htmlFor="name">
          Title Of Concern
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="name"
          placeholder="Title for your concern"
          required
          maxLength={60}
        />
          <label className="text-md" htmlFor="area">
          Area
        </label>
        <select
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="area"
          placeholder="Area (Be as precise as possible)"
          required
        >
          {l.map((c) => <option key={c} value={c}>{c}</option>)} 
        </select>
          <label className="text-md" htmlFor="contact">
          Phone Number
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="contact"
          type="number"
          maxLength={10}
          placeholder="Phone Number"
          required
        />
        <label className="text-md" htmlFor="concern">
          Concern
        </label>
        <textarea
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="concern"
          placeholder="Please Type Out Your Concern (80 - 100 Characters)"
          required
          minLength={80}
          maxLength={1000}
        />
          <label className="text-md" htmlFor="concern">
          Priority Of Your Request (Please Be Honest)
        </label>
         <select className='px-4 py-2 mb-6 border rounded-md bg-inherit' name="priority">
        <option value="Very Urgent">Very Urgent</option>
        <option value="Urgent">Urgent</option>
        <option value="Moderate">Moderate</option>
      </select>
        <button className="px-4 py-2 mb-2 text-white bg-green-700 rounded-md text-foreground">
          Submit The Complaint
        </button>
        
       
      </form>
    </div>
   
  ) : (<div>Login To Create Complaints</div>)
}
