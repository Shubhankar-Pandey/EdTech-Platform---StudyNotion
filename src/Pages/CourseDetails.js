import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../Services/operation/StudentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCourseDetails } from "../Services/operation/courseDetailsAPI"
import GetAvgRating from "../utils/avgRating";
import Error from "./ErrorPage"
import ConfirmationModal from "../Components/Common/ConfirmationModal";
import RatingStars from "../Components/Common/RatingStars"
import { FormatDate } from "../Services/FormatDate"
import CourseDetailsCard from "../Components/Core/Course/CourseDetailsCard";
import { HiGlobeAlt } from "react-icons/hi";



function CourseDetails() {


    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { loading } = useSelector((state) => state.profile);


    const [confirmationModal, setConfirmationModal] = useState(null);
    const [courseData, setCourseData] = useState(null);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);


    useEffect(() => {
        const getFullCourseDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
            }
            catch (err) {
                console.log("Could not fetch course details");
            }
        }
        getFullCourseDetails();
    }, [courseId]);


    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        if (!courseData) {
            return;
        }
        const count = GetAvgRating(courseData?.courseDetails?.ratingAndReview);
        setAvgReviewCount(count);
    }, [courseData])



    useEffect(() => {
        if (!courseData) {
            return;
        }
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec?.subSection?.length || 0;
        })
        setTotalNoOfLectures(lectures);
    }, [courseData])




    const handleBuyCourse = () => {
        if (user) {
            buyCourse([courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "You are not Logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }


    if (loading || !courseData) {
        return (
            <div>
                <div className="spinner"></div>
            </div>
        )
    }

    if (!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }

    const {
        courseName,
        courseDescription,
        whatYouWillLearn,
        ratingAndReview,
        instructor,
        studentEnrolled,
        createdAt,
    } = courseData?.courseDetails;





    return (
        <div className="flex flex-col text-richblack-5">
            <div className="relative w-full bg-richblack-800">
                <div className="mx-auto w-full max-w-7xl px-4 md:px-10 py-10 lg:py-16 flex flex-col lg:flex-row gap-10 justify-between items-start">

                    {/* Left Side Info */}
                    <div className="w-full lg:w-[60%] flex flex-col gap-4 lg:border-r border-richblack-700 lg:pr-10">
                        <p className="text-3xl font-bold">{courseName}</p>
                        <p className="text-richblack-200">{courseDescription}</p>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                            <span className="text-yellow-50">{avgReviewCount}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className="text-richblack-25">{`(${ratingAndReview.length} reviews)`}</span>
                            <span className="text-richblack-25">{`${studentEnrolled.length} students enrolled`}</span>
                        </div>

                        <div>
                            <p className="text-richblack-25 font-semibold">Created By {instructor.firstName} {instructor.lastName}</p>
                        </div>

                        <div className="flex flex-wrap gap-x-2 text-richblack-25 items-center">
                            <p>Created At {FormatDate(createdAt)}</p>
                            <div className="flex items-center gap-x-1 ml-0 sm:ml-3">
                                <HiGlobeAlt className="text-lg" />
                                <p> {" "} English </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Card Layout */}
                    <div className="w-full lg:w-[35%] relative">
                        <CourseDetailsCard
                            course={courseData?.courseDetails}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>

                </div>
            </div>




            <div className="border border-richblack-700 rounded-md w-full max-w-7xl px-4 md:px-10 lg:w-[50%] mx-auto lg:mx-0 lg:ml-20 p-6 mt-10">
                <p className="text-2xl font-bold mb-4">What you will learn</p>
                <div className="text-richblack-50 leading-relaxed">
                    {whatYouWillLearn}
                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>
    )
}


export default CourseDetails;