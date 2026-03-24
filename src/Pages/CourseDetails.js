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


    const[isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) => e != id)
        )
    }


    return (
        <div className="flex flex-col text-richblack-5">

            <div className="relative">
                <p>{courseName}</p>
                <p>{courseDescription}</p>

                <div className="flex gap-x-2">
                    <span>{avgReviewCount}</span>
                    <RatingStars Review_Count = {avgReviewCount}/>
                    <span>{`(${ratingAndReview.length} reviews)`}</span>
                    <span>{`(${studentEnrolled.length} students enrolled)`}</span>
                </div>

                <div>
                    <p>Created By {instructor.firstName} {instructor.lastName}</p>
                </div>

                <div className="flex gap-x-2">
                    <p>Created At {FormatDate(createdAt)}</p>
                    <p> {" "} English </p> 
                </div>
            </div>


            <div>
                <CourseDetailsCard 
                    course = {courseData?.courseDetails}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                />
            </div>

            <div>
                <p>What you will learn</p>
                <div>
                    {whatYouWillLearn}
                </div>
            </div>

            <div>
                <div>
                    <p>Course Content</p>
                </div>

                <div className="flex gap-x-3">

                    <div>
                        <span>{courseContent.length} section(s)</span>
                        <span> {totalNoOfLectures} lectures(s) </span>
                    </div>

                    <div>
                        <button onClick={() => {
                            setIsActive([])}}
                        >Collapse All Sections </button>
                    </div>
                    
                </div>
                
                
            </div>

            


            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

        </div>
    )
}


export default CourseDetails;