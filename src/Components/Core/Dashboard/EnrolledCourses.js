import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../Services/operation/profileAPI"
import { useEffect, useState } from "react";



function EnrolledCourses(){

    const {token} = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error){
            console.log("Unable to fetch enrolled courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    },[])


    return (
        <div className="text-richblack-5">
            <div>Enrolled Courses</div>
            {
                !enrolledCourses ? 
                (<div>
                    <div className="spinner"></div>
                </div>)
                : enrolledCourses.length === 0 ? 
                (<p>You have not enrolled in any course yet</p>) 
                : (
                    <div>
                        <div>
                            <p>Course name</p>
                            <p>Duration</p>
                            <p>Porgress</p >
                        </div>
                        {
                            enrolledCourses.map((course, index) => (
                                <div key={index}>
                                    <p>{course.courseName}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default EnrolledCourses;