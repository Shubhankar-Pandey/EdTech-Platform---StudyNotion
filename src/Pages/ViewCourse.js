import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../Services/operation/courseDetailsAPI";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../Slices/viewCourseSlice";
import VideoDetailSideBar from "../Components/Core/ViewCourse/VideoDetailSideBar"
import CourseReviewModal from "../Components/Core/ViewCourse/CourseReviewModal"



function ViewCourse(){

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId);
            
            if (courseData?.courseDetails) {
                dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
                dispatch(setEntireCourseData(courseData.courseDetails));
                dispatch(setCompletedLectures(courseData.completedVideos || []));
            }

            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec?.subSection?.length || 0;
            })

            dispatch(setTotalNoOfLectures(lectures));

        }
        setCourseSpecificDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col-reverse md:flex-row">
                <VideoDetailSideBar setReviewModal={setReviewModal} />
                <div className="h-auto md:h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-6">
                        <Outlet />
                    </div>
                </div>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
    )
}


export default ViewCourse;