import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../Services/operation/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../Slices/courseSlice";


function EditCourse() {

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const populateCourseDetail = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (loading) {
        return (
            <div>
                Loading....
            </div>
        )
    }

    return (
        <div className="text-richblack-5 w-[70%] mx-auto">
            <h1>Edit Course</h1>

            <div>
                {
                    course ? (<RenderSteps />) : (<p>Course Not Found</p>)
                }
            </div>

        </div>
    )
}


export default EditCourse;

