export default function Search(){
return(<div className='relative flex flex-row flex-grow h-12'>
<input className='absolute w-full px-6 py-4 text-xs font-semibold text-black border border-black rounded-lg outline-none placeholder:text-black focus:text-black focus:border-2 focus:border-black' type="text" placeholder="Search Posts..."></input>
<button className='px-5 py-[2px] text-xs top-[5px] h-10 bottom-[5px] right-[6px] rounded-lg text-white bg-black absolute '>Search</button>
</div>)
}