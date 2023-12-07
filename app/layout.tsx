import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import DeployButton from '@/components/DeployButton'
import AuthButton from '@/components/AuthButton'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'CFRH - Chennai Flood Relief Helper',
  description: 'A simple site to compile all concerns concerns related to the Chennai floods in one place for easy resolving',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="flex flex-col items-center min-h-screen">
        <div className="flex flex-col items-center flex-1 w-full gap-10"> <nav className="fixed z-10 flex justify-center w-full h-16 border-b bg-neutral-50 border-b-foreground/10"> <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm"> <DeployButton /> {<AuthButton />} </div> </nav>
        <div className='pt-[103px]'>  {children}</div>
          </div>
        </main>
      </body>
    </html>
  )
  }
