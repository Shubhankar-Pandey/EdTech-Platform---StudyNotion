import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../Services/operation/StudentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCourseDetails } from "../Services/operation/courseDetailsAPI"
import GetAvgRating from "../utils/avgRating";
import Error from "./ErrorPage"
import ConfirmationModal from "../Components/Common/ConfirmationModal";
import RatingStars from "../Components/Common/RatingStars"
import {FormatDate} from "../Services/FormatDate"
import CourseDetailsCard from "../Components/Core/Course/CourseDetailsCard";
import { HiGlobeAlt } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";



function CourseDetails(){

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state) => state.course);


    const [confirmationModal, setConfirmationModal] = useState(null);
    const [courseData, setCourseData] = useState(null);

    const[isActive, setIsActive] = useState([]);
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) => e !== id)
        )
    }

    useEffect(() => {
        const getFullCourseDetails = async() => {
            try{
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
            }
            catch(err){
                console.log("Could not fetch course details");
            }
        }
        getFullCourseDetails();
    }, [courseId]);


    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        if(!courseData){
            return;
        }
        const count = GetAvgRating(courseData?.courseDetails?.ratingAndReview);
        setAvgReviewCount(count);
    }, [courseData])


    const[totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        if(!courseData){
            return;
        }
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec?.subSection?.length || 0;
        })
        setTotalNoOfLectures(lectures);
    }, [courseData])


    
    
    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1 : "You are not Logged in",
            text2 : "Please login to purchase the course",
            btn1Text : "Login",
            btn2Text : "Cancel",
            btn1Handler : () => navigate("/login"), 
            btn2Handler : () => setConfirmationModal(null),
        })
    }


    if(loading || !courseData){
        return (
            <div>
                <div className="spinner"></div>
            </div>
        )
    }

    if(!courseData.success){
        return (
            <div>
                <Error/>
            </div>
        )
    }

    const {
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReview,
        instructor,
        studentEnrolled,
        createdAt,
    } = courseData?.courseDetails;


    


    return (
        <div className="flex flex-col text-richblack-5">

            <div className="relative w-full bg-richblack-800 h-80 flex items-center gap-4">

                <div className="w-[50%] flex flex-col gap-2 border-r-2 border-r-richblack-700 ml-20">
                    <p className="text-3xl">{courseName}</p>
                    <p className="text-richblack-200">{courseDescription}</p>

                    <div className="flex gap-x-2">
                        <span className="text-yellow-50">{avgReviewCount}</span>
                        <RatingStars Review_Count = {avgReviewCount}/>
                        <span className="text-richblack-25">{`(${ratingAndReview.length} reviews)`}</span>
                        <span className="text-richblack-25">{`${studentEnrolled.length} students enrolled`}</span>
                    </div>

                    <div>
                        <p className="text-richblack-25">Created By {instructor.firstName} {instructor.lastName}</p>
                    </div>

                    <div className="flex gap-x-2 text-richblack-25">
                        <p>Created At {FormatDate(createdAt)}</p>
                        <div className="flex items-center gap-x-1 ml-3">
                            <HiGlobeAlt className="text-lg"/>
                            <p> {" "} English </p> 
                        </div>
                        
                    </div>
                </div>

                <div className="absolute top-10 right-36">
                    <CourseDetailsCard 
                        course = {courseData?.courseDetails}
                        setConfirmationModal = {setConfirmationModal}
                        handleBuyCourse = {handleBuyCourse}
                    />
                </div>


            </div>


            

            <div className="border-2 border-richblack-700 w-[50%] ml-20 p-6 mt-10">
                <p className="text-2xl">What you will learn</p>
                <div className="text-richblack-50">
                    {whatYouWillLearn}
                </div>
            </div>

            <div className="w-[50%] ml-20 mt-10">
                <div>
                    <p className="text-xl">Course Content</p>
                </div>

                <div className="flex justify-between mt-3">

                    <div className="flex gap-x-3 text-richblack-50">
                        <div className="flex items-center">
                            <GoDotFill />
                            <span>{courseContent.length} sections</span>
                        </div>
                        <div className="flex items-center">
                            <GoDotFill />
                            <span> {totalNoOfLectures} lectures </span>
                        </div>
                    </div>

                    <div>
                        <button 
                        className="text-yellow-50"
                        onClick={() =>
                            setIsActive([])}
                        >Collapse All Sections </button>
                    </div> 
                    
                </div>
                
                
            </div>

            


            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

        </div>
    )
}


export default CourseDetails;