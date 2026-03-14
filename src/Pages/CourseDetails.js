import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../Services/operation/StudentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";



function CourseDetails(){

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();


    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
    }


    return (
        <div>
            <button className="bg-yellow-50 px-4 py-2 text-richblack-900 rounded-md
            transition-all duration-200 hover:scale-95"
            onClick={() => handleBuyCourse()} >
                Buy now
            </button>
        </div>
    )
}


export default CourseDetails;