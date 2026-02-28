import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../Services/operation/courseDetailsAPI";
import IconButton from "../../Common/IconButton"
import CoursesTable from "./InstructorCourses/CoursesTable"
import { useEffect, useState } from "react";



function MyCourses(){

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);



    useEffect(() => {
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
        }
        fetchCourses();
    }, [])



    return (
        <div className="text-richblack-5">

            <div>
                <h1>My Courses</h1>
                <IconButton
                  text="Add Course"
                  onClick={() => navigate("/dashboard/add-course")}  
                  // TODO : add plus icon yourself  
                />
            </div>

            
            <CoursesTable courses = {courses} setCourses = {setCourses}/>
            

        </div>
    )
}


export default MyCourses;