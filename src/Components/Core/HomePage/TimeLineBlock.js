

function TimeLineBlock({logo, heading, subheading}){
    return (
        <div className="flex gap-6">
            <div className="bg-white p-4 object-fill shadow-md
             rounded-full flex items-center justify-center">
                <img className="w-[20px] h-[20px]" src = {logo} alt="logo image"></img>
            </div>
            <div className="flex flex-col items-start">
                <p className="font-bold">{heading}</p>
                <p className="text-sm text-pure-greys-400">{subheading}</p>
            </div>
        </div>
    )
}

export default TimeLineBlock;