'use client'

  import { createClient } from '@/utils/supabase/client' 


export default function Index() {
  
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

const isSupabaseConnected = canInitSupabaseClient()
if(isSupabaseConnected){
  
  return ( 
    <div></div>) }}
