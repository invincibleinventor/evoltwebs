export default function PostAComment(props){
    return(    <div className="flex flex-row px-2 mt-0 mb-3 space-x-4">
    <img src={props.myphoto} className="w-8 h-8 shrink-0"/>
    <textarea className="w-full px-4 py-2 border outline-none focus:border-gray-700" placeholder={"Post a comment publicly as "+props.myname}>
      
    </textarea>
  </div>
    )
}