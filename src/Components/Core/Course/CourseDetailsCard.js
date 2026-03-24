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
        <div className="text-richblack-5">

            <img alt="course thumbnail image" src={course.thumbnail}  width="200"/>
            <p>Rs. {course.price}</p>

            <div>
                <button onClick={
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
                        <button onClick={() => handleAddToCart()}>
                            Add to cart
                        </button>
                    )
                }
            </div>

            <p>30-Day Money-Back Guarantee</p>

            <div>
                <button onClick={() => handleShare()}>
                    Share
                </button>
            </div>
                
        </div>
    )
}

export default CourseDetailsCard;