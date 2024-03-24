import Toggle from "./components/resumetoggle";

export default function page(){
    return(
        <div>
            <div className="flex flex-row items-center content-center h-max">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-xl font-semibold text-black">
                        Resume Setup
                    </h1>
                    <h1 className="pb-3 text-sm font-normal text-black">
                        Your resume is not setup yet. Your resume showcases a breif overview of yourself to other people on Evolt.
                    </h1>
                    <Toggle></Toggle>
                </div>
            </div>
        </div>
    )
}