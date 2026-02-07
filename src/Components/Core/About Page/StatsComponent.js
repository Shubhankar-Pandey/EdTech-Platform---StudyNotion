

function StatsComponent(){

    const Stats = [
        {count : "5K", label : "Active Students"},
        {count : "10+", label : "Mentors"},
        {count : "200+", label : "Courses"},
        {count : "50+", label : "Awards"},
    ]

    return (
        <div className="w-full bg-richblack-800 mt-20">
            <div className="flex justify-evenly mt-20 mb-20">
                {
                    Stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="text-richblack-5 text-3xl font-bold"> {stat.count} </div>
                            <div className="text-richblack-500"> {stat.label} </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default StatsComponent;