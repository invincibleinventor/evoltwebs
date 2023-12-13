export default function Search(){
return(<div className='relative flex flex-row flex-grow h-12'>
<input className='absolute w-full px-6 py-4 text-xs font-semibold text-red-500 border border-red-500 rounded-full shadow-lg outline-none placeholder:text-red-300 focus:text-red-600 focus:border-2 focus:border-red-500' type="text" placeholder="Search Posts..."></input>
<button className='px-5 py-[2px] text-xs top-[5px] h-10 bottom-[5px] right-[6px] rounded-full text-white bg-red-400 absolute '>Search</button>
</div>)
}