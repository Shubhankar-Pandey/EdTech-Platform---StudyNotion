import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformationForm";

function RenderSteps(){

    const {step} = useSelector((state) => state.course);

    // console.log("step = ", step);

    const steps = [
        {
            id : 1,
            title : "Course Information",
        },
        {
            id : 2,
            title : "Course Builder",
        },
        {
            id : 3,
            title : "Publish"
        },
    ]


    return (
        <div>

            <div className="flex p-6 justify-between">
                {
                    steps.map((stage) => (

                        <div key={stage.id} className={`flex flex-col items-start
                         ${stage.id < 3 ? "w-full" : ""}`}>

                            <div className="flex items-center w-full">

                                <div 
                                    className={`${stage.id === step ?
                                    "bg-yellow-900 text-yellow-50 border-[1px] border-yellow-50" 
                                    : stage.id > step ? 
                                    "bg-richblack-800 border-[1px] border-richblack-700 text-richblack-300" 
                                    : "bg-yellow-50"} 
                                    p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl
                                    `}>
                                    
                                    {
                                        step > stage.id ? (<div className="text-richblack-900"> <FaCheck /> </div>)
                                        : (<div>{stage.id}</div>)
                                    }
                                    
                                </div>

                                {
                                    stage.id < 3 && (
                                        <div className={`border-t-[1px] border-dashed border- w-full
                                        ${step > stage.id ? "border-yellow-50" : "border-richblack-100"}`}>
                                            
                                        </div>
                                    )
                                    
                                }

                            </div>

                            <div className={`mt-3 -mx-4
                                ${step >= stage.id ? "text-richblack-5" : "text-richblack-300"}`}>
                                {stage.title}
                            </div>


                        </div>
                        
                    ))
                }
            </div>

            {step === 1 && <CourseInformationForm/>}
            {/* {step === 2 && <CourseBuilderForm/>}
            {step === 3 && <PublishForm/>} */}


        </div>

    )
}

export default RenderSteps;