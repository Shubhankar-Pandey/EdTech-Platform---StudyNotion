import RenderSteps from "./RenderSteps"



function AddCourse (){

    return (
        <div className="text-richblack-5 flex justify-between">
            <div className="w-[60%]">
                <div className="text-2xl">Add course</div>
                <div className="w-full mt-5">
                    <RenderSteps/>
                </div>
            </div>
            <div className="w-[38%] text-sm p-6 border-[1px] border-richblack-700
            rounded-md max-h-min bg-richblack-800">
                <p className="text-xl">⚡Course Upload Tips</p>
                <ul className="flex flex-col gap-3 mt-5 list-disc pl-3">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important.</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    )
}

export default AddCourse;