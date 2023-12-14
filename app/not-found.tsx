import Link from "next/link";

 
export default function Error({ error, reset }) {
  return (
    <div className="flex items-center content-center w-full h-screen px-10 lg:px-24 sm:px-24 md:px-16">
      <div className="flex flex-col gap-2 mx-auto max-w-max">
      <h1 className="mx-auto text-lg font-semibold text-center text-black">That Content Doesn't Exist</h1>
      <h1 className="mx-auto text-sm text-center text-neutral-400">That page does not exist. It must have been moved or deleted. Please refresh if you think that is not the case</h1>
      <Link href="/" className={`w-max mx-auto rounded-full text-xs font-bold mt-3 px-8 py-3 shadow-lg ${(1==1)?'bg-red-400 text-white border-2 border-red-400':'bg-white text-red-500 border-2 border-red-400'}`}>Return Back</Link>

      </div>
      
    </div>
  )
}