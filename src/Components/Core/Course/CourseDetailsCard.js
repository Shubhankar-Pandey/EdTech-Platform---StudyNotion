import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import {toast} from "react-hot-toast";
import { addToCart } from "../../../Slices/cartSlice";




function CourseDetailsCard({course, setConfirmationModal, handleBuyCourse}){

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleAddToCart(){
        if(user && user.accountType === "Instructor"){
            toast.error("You are a instructor, you can't buy a course");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        // else if person is not logged in 
        setConfirmationModal({
            text1 : "You are not logged in",
            text2 : "Please login, to add to cart",
            btn1Text : "Login",
            btn2Text : "Cancel",
            btn1Handler : () => navigate("/login"),
            btn2Handler : () => setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }


    return (
        <div className="text-richblack-5 bg-richblack-700 rounded-md">

            <img alt="course thumbnail image" src={course.thumbnail}  width="384px" height="201px"/>
            

            <div className="px-5 py-3 flex flex-col gap-3">
                <p className="text-3xl">Rs. {course.price}</p>

                <button
                    className="bg-richblack-800 rounded-md p-2 border-b-2 border-r-2 border-richblack-300
                    hover:scale-95 transition-all duration-200"
                onClick={
                    user && course?.studentEnrolled.includes(user?._id)
                    ? () => navigate("/dashboard/enrolled-courses")
                    : () => handleBuyCourse()
                }>
                    {
                        user && course?.studentEnrolled.includes(user?._id) ? "Go to course" : "Buy Now"
                    }
                </button>

                {
                    (!course.studentEnrolled.includes(user?._id)) && (
                        <button 
                        className="bg-yellow-50 rounded-md p-2 border-b-2 border-r-2 border-yellow-5
                        hover:scale-95 transition-all duration-200 text-richblack-900"
                        onClick={() => handleAddToCart()}>
                            Add to cart
                        </button>
                    )
                }
                
            </div>

            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-richblack-25">30-Day Money-Back Guarantee</p>

                <div className="mb-5">
                    <button 
                        className="text-yellow-100"
                    onClick={() => handleShare()}>
                        Share
                    </button>
                </div>
            </div>

            

            
                
        </div>
    )
}

export default CourseDetailsCard;