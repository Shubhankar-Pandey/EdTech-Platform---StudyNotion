
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../Services/operation/courseDetailsAPI";
import IconButton from "../../Common/IconButton"
import CoursesTable from "./InstructorCourses/CoursesTable"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";


function MyCourses() {


    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);



    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses();
            if (result) {
                setCourses(result);
            }
        }
        fetchCourses();
    }, [])



    return (
        <div className="text-richblack-5 w-11/12">

            <div className="flex justify-between items-center">
                <h1 className="text-2xl">My Courses</h1>
                <IconButton
                    onClick={() => navigate("/dashboard/add-course")}
                    customClasses={"bg-yellow-50 px-4 py-2 text-richblack-900 rounded-md hover:scale-95 transition-all duration-200 flex items-center justify-center font-bold"}>
                    <FaPlus />
                    <p>Add Course</p>
                </IconButton>
            </div>


            <CoursesTable courses={courses} setCourses={setCourses} />


        </div>
    )
}


export default MyCourses;